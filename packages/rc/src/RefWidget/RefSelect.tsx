import { Select, Spin } from 'antd';
import { useState, forwardRef, useEffect, useMemo, useCallback } from 'react';
import { BasicFormItemProps, EnumFieldType, FieldSelect } from '@crv/utils/src/types';
import { getRefTargetFields } from '@crv/utils/src/browser/business/fields';
import {
  useGetInitialOptions,
  useLazyLoadRefDataOption,
  useQuerySelfRecordData,
} from './hooks';
import { debounce } from '@crv/utils/src/browser/optimize';
import { useDiffCallback } from '@crv/rc/src/hooks/basic/usePrevious';
import { transformRefData } from './utils';
import Loading from '../Loading';

// 默认下拉选的分页大小
export const DEFAULT_SELECT_PAGE_SIZE = 15;
// 默认的懒加载延迟（单位ms）
export const DEFAULT_LAZY_LOAD_DELAY = 200;

interface RefSelectProps extends BasicFormItemProps {
  field: string;
  modelId: string;
  // 是否正在编辑状态,默认为true
  editing?: boolean;
  config: FieldSelect;
  props?: any;
  // 是否发请求
  request?: boolean;
  // 对props进行转换
  transformProps?: (props: any) => any;
  // 查询自身数据的上下文
  querySelfDataContext?: any;
};

export const filterOption = (inputValue: string, option: any) => {
  // option.label可能是数字，故此处转换为字符串
  return String(option.label).includes(inputValue);
};

export default forwardRef(function RefSelect ({
  modelId,
  field,
  editing = true,
  config,
  props,
  request = true,
  transformProps = props => props,
  // value,
  value: _value,
  onChange,
  querySelfDataContext,
}: RefSelectProps, ref) {
  // 根据配置，生成转换函数
  const transformValue = useMemo(() => transformRefData(config), [config]);
  const isMulti = config.fieldType === EnumFieldType.MANY_TO_MANY;
  const [searchText, setSearchText] = useState('');
  const convertVal = useCallback((v: any) => transformValue.wrapValue(v), [transformValue]);
  // 值变化时，进行相应的转换，并传递给表单
  const onHandleChange = useCallback((v: any) => {
    // 选中一项后自动清空当前条件
    setSearchText('');
    // 传递给表单
    onChange?.(convertVal(v));
  }, [convertVal, onChange, ]);
  // 根据显示格式，摘取需要查询下拉选时的哪些字段
  const refTargetFields = getRefTargetFields(config);
  // 是否是未加工的值（多选的时候，本应被transformValue.wrapValue包裹；若没被包裹，则为未加工的值）
  const isRawValue = useMemo(() => _value && isMulti && !(
    'data' in _value
    && 'refType' in _value
    && 'model' in _value
    && 'join' in _value
  ), [_value, isMulti]);
  // 若是未加工的值，则传递给表单加工后的值
  useEffect(() => {
    if (isRawValue) {
      onHandleChange(_value);
    }
  }, [isRawValue, _value, onHandleChange]);
  // 如果
  const value = isRawValue ? transformValue.wrapValue(_value) : _value;
  // initialValue主要针对单选，实体表查询得到的
  const [initialValue] = useState(value);
  const [initialOptionsData, setInitialOptionsData] = useState();
  // 仅限【多选】场景；查询自身记录对应的数据（仅多选时查询，单选因为是实体表字段，所以跟其他实体字段一起查询）
  const {
    isLoading: isLoadingRecordData, data: recordData,
  } = useQuerySelfRecordData({
    fieldConfig: config,
    modelId,
    querySelfDataContext,
  });
  // 【单选】、以及【其他工程调用】等场景的使用，采用此处获取初始值
  const {
    isLoading: isLoadingInitialOptions, data: initialData,
  } = useGetInitialOptions({
    initialValue,
    refTargetFields,
    modelId: config?.refModel,
    config,
  });
  // 查询下拉选项（单选、多选，均使用分页查询）
  const { options, isLoading, lazyLoad } = useLazyLoadRefDataOption({
    config,
    refTargetFields,
    modelId: config?.refModel,
    searchText,
    initialOptionsData,
  });
  // 自身记录对应的数据反馈给表单
  useDiffCallback(recordData, () => {
    // 多选控件，且重新加载了当前控件的值时，则将值传递给上层表单
    if (isMulti && !initialValue && recordData?.length) {
      const val = recordData?.map((item: any) => item.id) ?? [];
      setInitialOptionsData(recordData);
      onHandleChange(val);
    }
  });
  // 初始值对应的下拉选数据
  useDiffCallback(initialData, () => {
    if (initialData && !recordData) {
      setInitialOptionsData(initialData);
    }
  });
  if (!editing) {
    const displayContent = isMulti
      ? (value ?? initialOptionsData)?.data?.map((item: any) => options?.find(i => i.value === item.id)?.label)?.join(',')
      : options?.find(i => i.value === value)?.label;
    return isLoadingRecordData
      ? <Loading indicatorType='LoadingOutlined' />
      : (
          <span title={displayContent} >{displayContent}</span>
        );
  }
  // 设置对Select的基本的属性，并对这些属性进行转换。生成最终传递给Select的属性
  const { onPressEnter, ...transformedProps } = transformProps({
    ...(config?.fieldType === EnumFieldType.MANY_TO_MANY && {
      mode: 'multiple',
    }),
    // 虚拟滚动，在有很多重复key的情况下，会发生问题
    virtual: false,
    allowClear: true,
    value: transformValue.parseValue(value),
    showSearch: true,
    // notFoundContent: null,
    onChange: onHandleChange,
    onSearch: debounce(setSearchText, DEFAULT_LAZY_LOAD_DELAY),
    // 查询数据记录(isLoadingRecordData || isLoadingInitialOptions)时，以及分页查询下拉选时，均在提供loading状态
    loading: (isLoadingRecordData || isLoadingInitialOptions) || isLoading,
    options,
    filterOption,
    onClear: () => setSearchText(''),
    onPopupScroll: (e: React.ChangeEvent<HTMLDivElement>) => {
      const { clientHeight, scrollHeight, scrollTop } = e.target;
      if (clientHeight + scrollTop === scrollHeight) {
        lazyLoad();
      }
    },
    dropdownRender: (menu: any) => (
      <>
        {menu}
        {isLoading && <div style={{ textAlign: 'center' }} >
          <Spin size='small' />
        </div>}
      </>
    )
  });
  return (
    <Select {...{
      ...transformedProps,
      onInputKeyDown: (e) => {
        // 单选，且回车时，触发onPressEnter事件（主要用于主从表的取消聚焦）
        e.code === 'Enter' && !['multiple', 'tags'].includes(transformedProps?.mode) && transformedProps?.onPressEnter?.(e);
      },
    }} />
  );
});

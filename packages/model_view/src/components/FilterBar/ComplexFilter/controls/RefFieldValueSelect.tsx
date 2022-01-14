/* eslint-disable no-template-curly-in-string */
import React, { FC, useEffect, useMemo } from 'react';
import { SelectProps, Select, Spin } from 'antd';
import debounce from 'lodash/debounce'
import { post } from '@crv/utils/src/browser/request';
import { refTransform } from '@/utils/utilConvert';
import styles from './index.less';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  fetchOptions: (search: string | any[], existValue?: any[]) => Array<Promise<ValueType[]>>
  debounceTimeout?: number
  filterField: string
  displayFormat: string
}

function DebounceSelect<ValueType extends { key?: string, label: React.ReactNode, value: string | number } = any> ({ fetchOptions, debounceTimeout = 800, filterField, displayFormat, ...props }: DebounceSelectProps) {
  const [fetching, setFetching] = React.useState(true);
  const [options, setOptions] = React.useState<ValueType[]>([]);
  const fetchRef = React.useRef(0);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: string, existValue?: any[]) => {
      fetchRef.current += 1;
      // const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      Promise.all(fetchOptions(value, existValue)).then((res: any) => {
        const ops: any = [];
        res?.forEach((newOptions: any) => {
          const { data: { result } } = newOptions;
          const { data } = result[0];
          const matches = displayFormat.match(/\${([a-zA-Z_]{1}[a-zA-Z0-9_]*)}/g);
          const tempOption = data?.map((item: any) => {
            const keyValMap: any = {}
            matches?.forEach((m: string) => {
              const tf = m.replace(/[${}]/g, '');
              keyValMap[m] = item[tf];
            })
            let str = displayFormat;
            Object.keys(keyValMap).forEach((key: string) => {
              str = str.replaceAll(key, keyValMap[key]);
            })
            if (!ops.find((o: any) => o.value === `${item.id}`)) {
              ops.push({ value: `${item.id}`, label: str })
            }
            return ({ value: `${item.id}`, label: str })
          })
          console.info(tempOption)
        })
        setOptions(ops);
        setFetching(false);
      })
    };
    return debounce(loadOptions, debounceTimeout);
  }, []);// fetchOptions, debounceTimeout, filterField

  useEffect(() => {
    if (options.length === 0) {
      debounceFetcher('', props.value);// props.value
    }
  }, [])

  return (
    <Spin spinning={fetching}>
      <Select
        className={styles.refFieldValueSelect}
        loading={fetching}
        filterOption={false}
        onSearch={(val: string) => debounceFetcher(val, props.value)}// debounceFetcher(val, props.value)
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
      />
    </Spin>
  );
}

export interface RefFieldValueSelectProps {
  value: string
  onChange: (value: any) => void
}

/**
 * 关联字段值控件
 * @param param0
 * @returns
 */
const RefFieldValueSelect: FC<any> = ({ value, onChange, filterField, modelId, displayFormat, config, ...props }) => {
  const { content, showFormat, childrens } = config;

  const qFields = useMemo(() => {
    const isExistenceName = childrens?.findIndex((o: any) => o.id === 'name') !== -1
    const refFields = (content || showFormat || isExistenceName) ? refTransform(content || showFormat || '${name}') : [{ id: filterField ?? 'id' }] // ?? [{ id: 'id' }]
    // 字段过滤
    return [...refFields.filter((item: any) => childrens?.findIndex((o: any) => o.id === item.id) !== -1)]
  }, [childrens, content, filterField, showFormat]);

  // const displayFormat = useMemo(() => {
  //   const isExistenceName = childrens?.findIndex((o: any) => o.id === 'name') !== -1
  //   return (content || showFormat || isExistenceName) ? (content || showFormat || '${name}') : (filterField ? `$\{${filterField}}` : '${id}')
  // }, [childrens, content, filterField, showFormat])

  function fetchOptionList (content: string | any[], existValue?: any[]): Array<Promise<any>> { // Promise<any>
    console.log('fetching user', content);
    const tempFilter: any[] = qFields.map((o: any) => ({ [o.id]: { $like: content } }));
    if (existValue && existValue.length > 0) {
      tempFilter.push({ id: { $in: existValue } })
    }

    const allPost = [];

    if (existValue && existValue.length > 0) {
      allPost.push(post('/crvserviceview/data', [{
        model: modelId,
        type: 'query',
        pagination: { total: 1, current: 1, pageSize: 10 },
        fields: qFields,
        filter: { id: { $in: existValue } } // { $or: qFields.map((o: any) => ({ [o.id]: { [operator]: content } })) }
      }]))
    }

    const temp = qFields.map((o: any) => ({ [o.id]: { $like: content } }));
    let filter: any = {}
    if (temp.length > 1) { filter.$or = temp } else { filter = temp[0] }
    allPost.push(post('/crvserviceview/data', [{
      model: modelId,
      type: 'query',
      pagination: { total: 1, current: 1, pageSize: 10 },
      fields: qFields,
      filter: filter // { $or: qFields.map((o: any) => ({ [o.id]: { [operator]: content } })) }
    }]));
    return allPost
  }

  const triggerChange = (val: any[]) => {
    console.info('triggerChange', val)
    if (onChange) {
      onChange(val.join(','))
    }
  }

  return (
    <DebounceSelect
      mode="multiple"
      value={value?.split(',').filter((o: any) => !!o) ?? []}
      placeholder="请选择"
      fetchOptions={fetchOptionList}
      onChange={triggerChange}
      style={{ width: '100%' }}
      filterField={filterField}
      displayFormat={displayFormat}
      {...props}
    />
  )
}

export default RefFieldValueSelect;

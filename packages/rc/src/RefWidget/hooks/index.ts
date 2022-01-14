import { EnumDisplayType, EnumEditType, EnumFieldType, FieldSelect } from '@crv/utils/src/types';
import { useQuery } from 'react-query';
import { autoErrorPost as post } from '@crv/utils/src/browser/request';
import { COMMON_REQUEST_URL } from '@crv/utils/src/browser/actions/actions/callApi/index';
import { defaultHandleParseResult, replaceDynamicExpression } from '@crv/utils/src/browser/dynamicValue';
import message from '@crv/utils/src/browser/message';
import { useRef, useState, useEffect, useCallback } from 'react';
import { DEFAULT_SELECT_PAGE_SIZE } from '../RefSelect';
import { createRefQueryField, specialRefQueryFields, getDefaultDisplayField, getDefaultQueryField } from '@crv/utils/src/browser/business/fields';
import { pickProps } from '@crv/utils/src/browser/utils';

export * from './oneToMany';

// 设置显示格式
export const handleShowFormat = (config: FieldSelect, data: any, keyField: string = 'id') => {
  const showFormat = config?.showFormat;
  let res;
  if (!showFormat) {
    res = data?.[keyField];
  } else {
    try {
      res = defaultHandleParseResult(replaceDynamicExpression(showFormat, data));
    } catch (e) {
      message.warning(`解析字段显示格式[${showFormat}]出错`);
    }
  }
  return res ?? '';
};

// 处理初始选项
export const handleInitialOptions = (config: FieldSelect, initialValue: any) => {
  return config.fieldType === EnumFieldType.MANY_TO_MANY
    ? handleOptions(config, initialValue)
    : (initialValue !== undefined
        // 单选的情况，初始选项因为没有数据的其他字段，所以暂且如此处理；后续有可能会把拉取单选的数据放在控件中去做
        ? [{
            key: initialValue,
            label: initialValue,
            value: initialValue,
          }]
        : undefined);
};

// 获取显示的内容
export const getOptionLabel = (config: FieldSelect, item: any) => {
  const displayKeyField = getDefaultDisplayField(config);
  return handleShowFormat(config, item, displayKeyField);
};

// 处理选项
export const handleOptions = (config: FieldSelect, options: any[]) => {
  const keyField = getDefaultQueryField(config);
  return options?.map(item => {
    const key = item[keyField];
    return {
      key,
      label: getOptionLabel(config, item),
      value: key,
    };
  });
};

// 数组去重，主要针对option下拉选
const distinctOptions = (options1: any[], options2: any[]) => {
  const set = new Set();
  return (
    options1.concat(options2).filter(item => {
      const id = typeof item === 'object' ? item?.id : item;
      if (set.has(id)) {
        return false;
      }
      set.add(id);
      return true;
    }) || []
  );
};

// 暂定想查询全部数据时传递的pageSize,尽可能能查到所有需要的数据
export const INFINITE_PAGE_SIZE = 10000;

export const useGetInitialOptions = ({
  initialValue,
  modelId,
  refTargetFields,
  config,
}: any) => {
  const { data, isLoading } = useQuery(
    ['useGetInitialOptions', COMMON_REQUEST_URL, config, initialValue, modelId, refTargetFields.join('-')],
    () => post(COMMON_REQUEST_URL, [{
      // 单选和多选，筛选条件不一样
      filter: config.fieldType === EnumFieldType.MANY_TO_ONE
        ? {
            [config.refModelField]: {
              $in: [initialValue],
            },
          }
        : {
            id: {
              $in: initialValue.data?.map(({ id }: any) => id) ?? [],
            },
          },
      // 需要获取的字段
      fields: refTargetFields.map((item: any) => ({ id: item })),
      model: modelId,
      pagination: { current: 1, pageSize: INFINITE_PAGE_SIZE },
      type: 'query',
    }]),
    {
      enabled: !!(initialValue && modelId && refTargetFields.length),
    }
  );
  return {
    isLoading,
    data: data?.data?.result?.[0]?.data,
  };
};

// 懒加载请求下拉选
export const useLazyLoadRefDataOption = ({
  config,
  pagination: {
    pageSize = DEFAULT_SELECT_PAGE_SIZE,
  } = {},
  searchText,
  refTargetFields,
  initialOptionsData,
  modelId,
}: any) => {
  // 生成初始选项
  const [options, setOptions] = useState<any[]>([]);
  useEffect(() => {
    if (initialOptionsData) {
      // 此时可能已经获取了部分分页数据，只需要把数据记录值合并到options中即可
      setOptions((options: any[]) => distinctOptions(options, initialOptionsData));
    }
  }, [initialOptionsData]);
  const {
    currentPage, setTotal, reset, lazyLoad,
  } = usePageSize(pageSize);
  // 按筛选内容，进行分页查询
  const { data, isSuccess, isLoading } = useQuery(
    ['useLazyLoadRefDataOption', COMMON_REQUEST_URL, modelId, searchText, currentPage, pageSize, refTargetFields.join('-')],
    () => post(COMMON_REQUEST_URL, [{
      // 根据搜索内容筛选
      filter: {
        ...(searchText && {
          $or: refTargetFields.map((item: any) => ({ [item]: { $like: searchText } })),
        }),
      },
      // 需要获取的字段
      fields: refTargetFields.map((item: any) => ({ id: item })),
      model: modelId,
      pagination: { current: currentPage, pageSize },
      type: 'query',
    }]),
    {
      enabled: !!(modelId && refTargetFields.length),
    }
  );
  // 重新请求
  useEffect(() => {
    reset();
    setOptions([]);
  }, [reset, searchText]);
  // 请求成功，记录loading标志，记录总数
  useEffect(() => {
    if (isSuccess) {
      setTotal(data?.data?.result?.[0]?.total);
      const newOptionsData = data?.data?.result?.[0]?.data ?? [];
      // 对option进行去重处理
      setOptions((options: any[]) => distinctOptions(options, newOptionsData));
    }
  }, [data, isSuccess, setTotal]);
  return {
    options: handleOptions(config, options),
    isLoading,
    reset,
    lazyLoad,
  };
};

// 懒加载
export const useLazyLoad = ({
  targetRef,
  trigger,
}: any) => {
  const triggerRef = useRef<any>(null);
  useEffect(() => {
    triggerRef.current = trigger;
  });
  const [observer, setObserver] = useState(() => new IntersectionObserver(
    (entries) => {
      // 如果不可见，就返回
      if (entries[0].intersectionRatio <= 0) return;
      triggerRef.current?.();
    },
    {
      root: null,
      rootMargin: '10px',
      threshold: [0],
    }
  ));
  useEffect(() => {
    const newObserver = new IntersectionObserver(
      (entries) => {
        // 如果不可见，就返回
        if (entries[0].intersectionRatio <= 0) return;
        triggerRef.current?.();
      },
      {
        root: null,
        rootMargin: '10px',
        threshold: [0],
      }
    );
    targetRef.current && newObserver.observe(targetRef.current);
    setObserver(newObserver);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => targetRef.current && newObserver.unobserve(targetRef.current);
  }, [targetRef]);
  useEffect(() => {
    return () => observer.disconnect();
  }, [observer]);
  return {};
};

// 使用分页
export const usePageSize = (pageSize: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  return {
    currentPage,
    setCurrentPage,
    total,
    setTotal,
    reset: useCallback(() => {
      setCurrentPage(1);
      setTotal(0);
    }, []),
    lazyLoad: useCallback(() => {
      if (Math.ceil(total / pageSize) > currentPage) {
        setCurrentPage(p => ++p);
      }
    }, [currentPage, pageSize, total]),
  };
};

// 编辑、详情等非创建表单下，查询自身记录的数据
export const useQuerySelfRecordData = ({
  enable = true,
  fieldConfig,
  modelId,
  pageSize = DEFAULT_SELECT_PAGE_SIZE,
  querySelfDataContext,
}: any) => {
  const { displayType, editType, initialPageData } = querySelfDataContext ?? {};
  const {
    currentPage, total, reset, lazyLoad, setCurrentPage,
  } = usePageSize(pageSize);
  // 仅当【参数指定enable，且在表单展示界面，且不是新增界面，且只针对多对多和一对多两种情况】这些条件均满足时，才发请求
  const enabled = !!(enable && displayType === EnumDisplayType.view && editType !== EnumEditType.create && specialRefQueryFields.includes(fieldConfig.fieldType));
  const paginationEnabled = fieldConfig.fieldType === EnumFieldType.ONE_TO_MANY;
  const params = enabled && [{
    model: modelId,
    type: 'query',
    filter: {
      ...(enabled && {
        id: { $eq: initialPageData?.[0]?.id },
      }),
    },
    fields: [{
      ...createRefQueryField(fieldConfig),
      // // 加载数据暂时不用分页
      ...(paginationEnabled && {
        pagination: {
          current: currentPage,
          pageSize,
        },
      }),
    }],
  }];
  const { data, isLoading } = useQuery(
    [
      COMMON_REQUEST_URL, 'useQuerySelfRecordData', initialPageData?.[0]?.id, modelId,
      pickProps(fieldConfig, 'id refModel refField refModelField showFormat fieldType'.split(' ')), currentPage, pageSize,
    ],
    () => post(COMMON_REQUEST_URL, params),
    {
      enabled,
    },
  );
  return {
    ...(paginationEnabled && {
      current: currentPage,
      reset,
      lazyLoad,
    }),
    setCurrentPage,
    isLoading,
    data: data?.data?.result?.[0]?.data?.[0]?.[fieldConfig?.id]?.data,
    total,
  };
};

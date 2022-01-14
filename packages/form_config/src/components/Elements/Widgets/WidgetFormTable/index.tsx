import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { DisplayTypeContext, ModelContext, InitialPageDataContext } from '@/context';
import { useBasicWidgetProps } from '@/hooks/business/useWidget';
import CustomTable, {
  useEditRecordData,
  defaultBusinessConfig,
  mergeBusinessConfig,
  CustomTableBusinessConfig,
} from '@rc/CustomTable';
import editControl from './setEditControl';
import { useOneToManyWidgetConfig } from '@rc/RefWidget/hooks/oneToMany';
import { transformRefData } from '@rc/RefWidget/utils';
import Loading from '@rc/Loading';
import { useDiffCallback } from '@/hooks';

export default (props: any) => {
  const [data, setData] = useState(props.value);
  const [initialData, setInitialData] = useState<any[]>([]);
  const { onChange } = props;
  const { fieldConfig, props: basicWidgetProps } = useBasicWidgetProps(props);
  const transformValue = useMemo(() => transformRefData(fieldConfig), [fieldConfig]);
  const onHandleChange = useCallback((v: any) => {
    setData(v);
    onChange(transformValue.wrapValue(v, initialData));
  }, [onChange, transformValue, initialData]);
  const { editType, modelId } = useContext(ModelContext);
  const displayType = useContext(DisplayTypeContext);
  // TODO:isBatch批量操作的时候暂不处理，后续再处理
  const { data: initialPageData } = useContext(InitialPageDataContext);
  const querySelfDataContext = {
    displayType,
    editType,
    initialPageData,
  };
  const customConfig: CustomTableBusinessConfig = mergeBusinessConfig(props.widgetDetail?.props?.formTableProperties, defaultBusinessConfig);
  const [basicColumns, setColumns] = useState<any[]>([]);
  const {
    dataSource,
    onAddRow,
    columns,
    onDelete,
    // onHandleSave,
  } = useEditRecordData({
    onChange: onHandleChange,
    // onChange: setData,
    value: data,
    // initialData,
    basicColumns,
    editControl,
  });
  const {
    isLoadingViewConfig,
    isLoadingRecordData,
    viewConfig,
    // reset,
    // lazyLoad,
    columns: configColumns,
    dataSource: initialDataSource,
    pagination,
  } = useOneToManyWidgetConfig(querySelfDataContext, modelId, fieldConfig, customConfig, onAddRow, onDelete);
  useEffect(() => {
    setColumns(configColumns);
  }, [configColumns]);
  useDiffCallback(initialDataSource, () => {
    if (initialDataSource?.length) {
      setData(initialDataSource);
      setInitialData(initialDataSource);
    }
  });
  console.log('createRefQueryField-1-viewConfig', basicWidgetProps, viewConfig);
  console.log('initialDataSource', initialDataSource, dataSource);
  return isLoadingViewConfig
    ? <Loading />
    : (
        <ModelContext.Provider value={{
          modelId: fieldConfig.refModel,
          model: viewConfig,
          editType,
        }} >
          <CustomTable {...{
            customConfig,
            dataSource,
            setDataSource: onHandleChange,
            columns,
            setColumns,
            pagination,
            onAddRow,
            loading: isLoadingRecordData,
          }} />
        </ModelContext.Provider>
      );
};

// 转换内容
export const convertContent = ({ value }: any) => {
  const displayValue = value;
  const displayContent = String(displayValue ?? '');
  return displayContent;
};

// 展示表格内容
export const DisplayTableContent = (props: any) => {
  const displayContent = convertContent(props);
  return (
    <span title={displayContent} >{displayContent}</span>
  );
};

import { useQuery } from 'react-query';
import { useMemo, useState } from 'react';
import { modelRetrieveRequireUrl } from '@crv/utils/src/browser/business/api';
import { autoErrorPost as post } from '@crv/utils/src/browser/request';
import { FieldOneToMany, EnumFieldType } from '@crv/utils/src/types';
import {
  convertOperationsConfig,
  CustomTableBusinessConfig,
  getOperationColWidth,
  RowActions,
  OPERATION_DATA_INDEX, defaultBusinessConfig, DEFAULT_COLUMN_WIDTH,
  GAP,
} from '../../CustomTable';
import { useQuerySelfRecordData } from './index';
import { notEditableFields } from '@crv/utils/src/browser/business/fields';
import { useTreeModel } from '@crv/rc/src/hooks/business';

// 查询指定视图的配置views
export const useFetchViewConfig = ({
  viewId,
  modelId,
}: any) => {
  const params = {
    baseInfo: false,
    requireRefModel: true,
    modelId,
    fields: [],
    operations: [],
    views: [viewId],
  };
  const { data, isLoading } = useQuery(
    [modelId, viewId],
    () => post(modelRetrieveRequireUrl, params),
    {
      enabled: !!(modelId && viewId),
    }
  );
  return {
    data: useTreeModel(data?.data?.result),
    isLoading,
  };
};

// 一对多控件的配置
export const useOneToManyWidgetConfig = (querySelfDataContext: any, modelId: string, fieldConfig: FieldOneToMany, customConfig: CustomTableBusinessConfig, onAdd: any, onDelete: any) => {
  const { data: viewConfig, isLoading: isLoadingViewConfig } = useFetchViewConfig({
    modelId: fieldConfig.refModel,
    viewId: customConfig?.displayView,
  });
  const displayColumns = useMemo(
    () => [
      // 此处为viewConfig.viewFields中不包含id时的设置
      customConfig?.showRecordId && viewConfig?.views?.[0]?.viewFields?.find?.((item: any) => item.id === 'id') === -1 && {
        title: '主键',
        dataIndex: 'id',
        width: 60,
      },
      // TODO:summary, summaryFormat暂不处理，后续再处理
      ...(viewConfig?.views?.[0]?.viewFields?.map?.(({ id, summary, summaryFormat, headerAlign, columnWidth, contentAlign, showName }: any) => {
        // 无用处的字段不显示
        if (notEditableFields.includes(id)) return null;
        // 跟主表关联的字段,若不等于id，则默认不显示；若等于id，则显示
        if (id === fieldConfig?.refModelField) {
          if (fieldConfig?.refModelField !== 'id') {
            return null;
          }
        }
        // 其他的字段都显示
        const targetFieldConfig = viewConfig?.fields?.find((item: any) => item.id === id);
        return {
          title: showName || (targetFieldConfig?.name ?? targetFieldConfig?.id ?? ''),
          ...(contentAlign && { align: contentAlign.toLowerCase() }),
          ...(contentAlign && { onCell: () => ({ align: contentAlign.toLowerCase() }) }),
          ...(headerAlign && { onHeaderCell: () => ({ align: headerAlign.toLowerCase() }) }),
          dataIndex: id,
          width: columnWidth ?? DEFAULT_COLUMN_WIDTH,
          onCell: () => ({
            ...(contentAlign && { align: contentAlign.toLowerCase() }),
            customConfig: { targetFieldConfig },
          }),
          editable: true,
        };
      }) ?? [])
    ].filter(Boolean),
    [customConfig?.showRecordId, fieldConfig?.refModelField, viewConfig?.fields, viewConfig?.views]
  );
  const columns = useMemo(
    () => {
      const { dataRow = [], dataShowCount = 100 } = viewConfig?.views?.[0]?.viewOperations ?? {};
      const operations = viewConfig?.operations ?? [];
      const showRowAdd = defaultBusinessConfig.showBasicOperations && defaultBusinessConfig.showBasicOperationRowAdd;
      const showRowDelete = defaultBusinessConfig.showBasicOperations && defaultBusinessConfig.showBasicOperationRowDelete;
      const basicOperationText = [
        showRowAdd && 'rowAdd',
        showRowDelete && 'rowDelete',
      ].filter(Boolean) as string[];
      const showCount = dataShowCount - basicOperationText.filter(Boolean).length;
      return [
        customConfig?.showRowOperation && {
          title: '操作',
          // fixed: 'left',
          align: 'center',
          dataIndex: OPERATION_DATA_INDEX,
          width: getOperationColWidth(
            dataRow.slice(0, showCount),
            basicOperationText,
            'More'
          ),
          render: (text: any, record: any, index: number) => {
            const basicOperations = [
              showRowAdd && <a key='__rowAdd__' onClick={() => onAdd?.(text, record, index)}>新增</a>,
              showRowDelete && <a key='__rowDelete__' onClick={() => onDelete?.(text, record, index)}>删除</a>,
            ];
            return (
              <span
                style={{
                  display: 'flex',
                  gap: GAP,
                }}
              >
                {basicOperations}
                <RowActions {...{
                  record,
                  operations: convertOperationsConfig(dataRow, operations),
                  showCount,
                  context: {},
                }} />
              </span>
            );
          },
        },
        customConfig?.showRowNo && {
          title: '序号',
          dataIndex: 'index',
          width: 100,
          render: (value: any, record: any, index: number) => {
            return index + 1;
          },
        },
        ...displayColumns,
      ].filter(Boolean);
    },
    [customConfig?.showRowNo, customConfig?.showRowOperation, displayColumns, onAdd, onDelete, viewConfig?.operations, viewConfig?.views]
  );
  const [pageSize, setPageSize] = useState(() => customConfig?.pageSizeOptions?.[0] ?? defaultBusinessConfig.pageSizeOptions?.[0]);
  const {
    current,
    isLoading: isLoadingRecordData,
    data: recordData,
    total,
    reset,
    lazyLoad,
    setCurrentPage,
  } = useQuerySelfRecordData({
    enable: !!displayColumns.length,
    modelId,
    querySelfDataContext,
    fieldConfig: {
      ...fieldConfig,
      // 此处设置showFormat是为了兼容底层代码，方便指定查询哪些字段
      // 添加version是因为，更新的时候需要
      showFormat: displayColumns.map(item => item.dataIndex).concat(['version']).filter(dataIndex => {
        const targetFieldConfig = viewConfig?.fields?.find((item: any) => item.id === dataIndex);
        // 多选和明细表，需要单独查询，不在这里一起凑热闹查询
        return ![EnumFieldType.MANY_TO_MANY, EnumFieldType.ONE_TO_MANY].includes(targetFieldConfig?.fieldType);
      }).map(item => `\${${item}}`).join(' '),
    },
    pageSize,
  });

  return {
    isLoadingViewConfig,
    isLoadingRecordData,
    viewConfig,
    reset,
    lazyLoad,
    columns,
    operationsNode: null,
    dataSource: recordData ?? [],
    pagination: {
      current,
      total,
      pageSize,
      onShowSizeChange: (current: number, size: number) => {
        setPageSize(size);
        setCurrentPage(current);
      },
      // 指定分页有哪些页数
      ...(customConfig?.pageSizeOptions && {
        pageSizeOptions: customConfig.pageSizeOptions,
      }),
    },
  };
};

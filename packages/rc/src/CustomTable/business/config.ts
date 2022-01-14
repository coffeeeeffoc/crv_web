import { CustomTableBusinessConfig } from './types';
import { removeUndefined } from '@crv/utils/src/browser/utils';

// 操作栏的dataIndex
export const OPERATION_DATA_INDEX = '__operation__';

export const defaultBusinessConfig: CustomTableBusinessConfig = {
  // title: '我是表格标题',
  // showTitle: true,
  maxHeight: 300,
  virtualScroll: true,
  showBasicOperations: true,
  showBasicOperationRowAdd: true,
  showBasicOperationRowDelete: true,
  showHeaderControl: true,
  showHeaderFilter: true,
  showHeaderOperation: true,
  showRowOperation: true,
  showRecordId: true,
  showRowNo: true,
  editable: true,
  rowDraggable: true,
  headerColDraggable: true,
  headerColResizable: true,
  allowSelectColumns: true,
  pageSizeOptions: [20, 50, 100, 200],
  importExport: {
    allowExcelImportExport: true,
  },
};

// 依次遍历，合并属性
export const mergeBusinessConfig = (data1: CustomTableBusinessConfig, data2: CustomTableBusinessConfig): CustomTableBusinessConfig => {
  return {
    ...data2,
    ...removeUndefined(data1),
  };
};

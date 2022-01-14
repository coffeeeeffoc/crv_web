import { removeUndefined } from '@crv/utils/src/browser/utils';
import { CustomTableBasicConfig } from './types';

// 默认的列宽
export const DEFAULT_COLUMN_WIDTH = 200;
// table的tr的高度
export const TABLE_TR_HEIGHT = 35;
// table的header的高度
export const TABLE_HEADER_HEIGHT = 25;

export const defaultConfig: CustomTableBasicConfig = {
  virtualScroll: true,
  editable: true,
  showCheckbox: true,
  rowDraggable: true,
  headerColDraggable: true,
  headerColResizable: true,
  allowSelectColumns: true,
  showPagination: true,
  pageSizeOptions: [10, 20, 50, 100, 200],
  showQuickJumper: true,
  showSizeChanger: true,
  // eslint-disable-next-line no-template-curly-in-string
  showTotal: '第${range0}~${range1}条，总数：${total}条',
  importExport: {
    allowExcelImportExport: true,
  },
};

// 依次遍历，合并属性
export const mergeData = (data1: any, data2: any) => {
  return {
    ...data2,
    ...removeUndefined(data1),
  };
};

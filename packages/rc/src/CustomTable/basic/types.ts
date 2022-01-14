export interface CustomTableBasicConfig {
  // -是否支持虚拟滚动
  virtualScroll?: boolean;
  // +是否显示勾选框（默认true）
  showCheckbox?: boolean;
  // +是否可编辑
  editable?: boolean;
  // +是否允许数据行切换顺序
  rowDraggable?: boolean;
  // 是否显示分页
  showPagination?: boolean;
  // +分页大小（默认分页大小要在配置页面显示出来）
  pageSizeOptions?: number[];
  // 是否显示快速跳转至某页
  showQuickJumper?: boolean;
  // 是否展示 pageSize 切换器
  showSizeChanger?: boolean;
  // 显示分页总数格式，参考【第${range0}~${range1}条，总数：${total}条】
  showTotal?: string;
  // +是否允许列切换顺序
  headerColDraggable?: boolean;
  // +是否允许调整列宽
  headerColResizable?: boolean;
  // -是否允许选择部分列显示
  allowSelectColumns?: boolean;
  // -导入导出
  importExport?: {
    // 是否允许导入导出
    allowExcelImportExport?: boolean;
    // 导出文件名
    exportName?: string;
    // 检查导入结果，判断是否导入成功
    onCheckImport?: (data: any[]) => boolean;
  };
};

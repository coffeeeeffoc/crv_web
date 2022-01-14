import { DynamicValueConfig, defaultAcceptTypes } from '@@/Panels/PropertyDetail/Common';

export const FormTablePropsBoolean = [
  ['virtualScroll', '是否支持虚拟滚动'],
  ['showHeaderControl', '是否显示表头控件'],
  ['showHeaderFilter', '是否显示表头筛选'],
  ['showHeaderOperation', '是否显示表头操作按钮'],
  ['showRowOperation', '是否显示数据行操作按钮'],
  ['showRowNo', '是否显示数据行序号'],
  ['showRecordId', '是否显示数据行的主键id'],
  ['showCheckbox', '是否显示勾选框'],
  ['editable', '是否可编辑'],
  ['rowDraggable', '是否允许数据行切换顺序'],
  ['headerColDraggable', '是否允许列切换顺序'],
  ['headerColResizable', '是否允许调整列宽'],
  ['allowSelectColumns', '是否允许选择部分列显示'],
];

export const FormTablePropsString = [
];
export const FormTablePropsNumber = [
  ['displayView', '以某个视图显示'],
  ['maxHeight', '最大高度'],
];

export const FormTablePropsSelect = [
  ['saveViewType', '保存视图配置方式'],
];

export const createCustomConfig = (titleConfigArr: string[][], defaultAcceptType: string) => titleConfigArr.reduce((res, item) => ({
  ...res,
  [item[0]]: {
    header: item[1],
    Component: DynamicValueConfig,
    ComponentProps: {
      acceptTypes: [defaultAcceptType, ...defaultAcceptTypes],
    },
  },
}), {});

// 主从表的自定义属性
export const customConfigFormTable = {
  // Number
  ...createCustomConfig(FormTablePropsNumber, 'number'),
  // String
  ...createCustomConfig(FormTablePropsString, 'string'),
  // Boolean
  ...createCustomConfig(FormTablePropsBoolean, 'boolean'),
  // Select
  ...createCustomConfig(FormTablePropsSelect, 'json'),
  // Select multiple
  // Select tag
};

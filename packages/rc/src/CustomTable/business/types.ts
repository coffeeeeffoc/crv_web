import { EnumEditType } from '@crv/utils/src/types/business/business';
import { CustomTableBasicConfig } from '../basic/types';

export enum EnumFormTableBasicOperation {
  headerAdd = 'headerAdd',
  rowAdd = 'rowAdd',
  rowDelete = 'rowDelete',
};

export interface FormTableConfigField {
  // 字段的id
  id: string;
  // 字段的相关配置（暂时还不清楚有哪些配置）
  [key: string]: any;
};

export interface FormTableConfig {
  customTable: CustomTableBusinessConfig;
  // 视图的id（viewId不为空，则以该视图的字段和配置进行显示；若为空，则以配置的字段进行显示）
  viewId?: number;
  fields?: FormTableConfigField[];
};
// 三大类：字段0、操作1、显示2
export interface CustomTableBusinessConfig extends CustomTableBasicConfig {
  // -保存视图配置方式；displayView为空时，值为null；displayView不为空时，值默认为viewId
  saveViewType?: 'viewId' | 'json' | 'viewAndJson';
  // -当saveViewType为json时，值为displayView对应的视图的相关配置；当saveViewType为viewId时，值为null
  displayViewConfig?: any;
  // +以某个视图显示
  displayView?: string;
  // 2最大高度
  maxHeight?: number;
  // // 表格标题（若showTitle为true，则当title为空时显示主表字段的label；当title不为空是显示设置的title。若showTitle为false，则不显示标题）
  // title?: string;
  // // 是否显示表格标题
  // showTitle?: boolean;
  // +是否显示表头控件（包括表头操作按钮和表头筛选）(默认为true)（为false时，showHeaderFilter，showBasicOperationHeaderAdd失效）
  showHeaderControl?: boolean;
  // 是否显示表头刷新
  showHeaderRefresh?: boolean;
  // 是否显示表头筛选
  showHeaderFilter?: boolean;
  // -是否显示表头快速筛选
  showHeaderQuickSearchFilter?: boolean;
  // -是否显示表头高级筛选
  showHeaderAdvancedSearchFilter?: boolean;
  // +是否显示配置的数据行操作按钮
  showRowOperation?: boolean;
  // +是否显示基本操作按钮（表头新增、行新增、行删除）(默认为true，为false时，下面三个失效)
  showBasicOperations?: boolean;
  // +是否显示基本操作按钮（表头新增）(默认为true)
  showBasicOperationHeaderAdd?: boolean;
  // +是否显示基本操作按钮（行新增）(默认为true)
  showBasicOperationRowAdd?: boolean;
  // +是否显示基本操作按钮（行删除）(默认为true)
  showBasicOperationRowDelete?: boolean;
  // +是否显示配置的表头操作按钮
  showHeaderOperation?: boolean;
  // +是否显示数据行序号
  showRowNo?: boolean;
  // +是否显示数据行的主键id
  showRecordId?: boolean;
  // -可编辑列（指定哪些字段可编辑，分为所有表单类型、指定表单类型两种配置方式）
  editableFieldColumns?: string[] | {
    [key in EnumEditType]: string[];
  };
  // -表单视图中的展示配置
  formViewConfig?: any;
  // TODO：筛选右侧的刷新、字段默认值、固定列
  // -加载关联数据的方式：独立加载，一次性全部加载
  loadingRefDataMethod?: 'independent' | 'oneTime';
};

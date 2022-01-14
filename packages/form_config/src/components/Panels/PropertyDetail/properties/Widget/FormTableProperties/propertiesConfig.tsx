import SelectView from './SelectView';
import SelectColumns from './SelectColumns';
import AdvancedSettings from './AdvancedSettings';
import { OptionData } from 'rc-select/es/interface';

export type ControlType = 'enum' | 'string' | 'number' | 'boolean' | 'json' | 'function' | 'tagSelect' | React.ForwardRefExoticComponent<any>;

export interface PropertiesConfigValueType {
  // 初始值
  initialValue?: any;
  // 类型
  controlType?: ControlType;
  // controlType为组件时使用，表示是否为下拉选组件
  isSelect?: boolean;
  // 其他可切换类型选项
  otherControlType?: string[];
  // 枚举选项
  enumOptions?: string[] | number[] | OptionData[];
  // 判断某个属性是否可见
  hiddenCondition?: (recordValue: any) => boolean;
  // label标签
  title?: string;
  // 详细描述
  description?: string;
  // 需要展开的复杂设置
  collapseSettings?: PropertiesConfigType;
};

export const SPECIAL_FIELDS_REG = /^__.+__$/;
export interface PropertiesConfigType {
  [key: string]: PropertiesConfigValueType;
}
export const propertiesConfig: PropertiesConfigType = {
  saveViewType: {
    title: '保存视图配置方式',
    initialValue: 'viewId',
    controlType: 'enum',
    enumOptions: [{ value: 'viewId', label: '视图id' }, { value: 'json', label: '单独配置' }],
  },
  displayView: {
    title: '选择某个视图',
    controlType: SelectView,
    isSelect: true,
  },
  __fields__: {
    title: '字段配置',
    controlType: SelectColumns,
    hiddenCondition: (recordValue) => recordValue?.saveViewType === 'viewId',
  },
  maxHeight: {
    title: '表格最大高度',
    controlType: 'number',
    otherControlType: ['string']
  },
  loadingRefDataMethod: {
    initialValue: 'independent',
    title: '加载关联数据的方式',
    controlType: 'enum',
    enumOptions: [{ value: 'independent', label: '独立加载' }, { value: 'json', label: '一次性全部加载', disabled: true }],
  },
  showHeaderControl: {
    title: '是否显示表头控件',
    initialValue: true,
    description: '同时控制多个参数。为【否】时，只要是会出现在表头的控件，都会消失',
    controlType: 'boolean',
  },
  showHeaderRefresh: {
    title: '是否显示表头刷新',
    initialValue: false,
    controlType: 'boolean',
  },
  showHeaderFilter: {
    title: '是否显示表头筛选',
    initialValue: false,
    controlType: 'boolean',
  },
  showHeaderQuickSearchFilter: {
    title: '是否显示表头快速筛选',
    initialValue: false,
    controlType: 'boolean',
  },
  showHeaderAdvancedSearchFilter: {
    title: '是否显示表头高级筛选',
    initialValue: false,
    controlType: 'boolean',
  },
  showRowOperation: {
    title: '是否显示配置的数据行操作按钮',
    initialValue: true,
    controlType: 'boolean',
  },
  showBasicOperations: {
    title: '是否显示基本操作按钮',
    initialValue: true,
    description: '（表头新增、行新增、行删除）(默认为true，为false时，下面三个失效)',
    controlType: 'boolean',
  },
  showBasicOperationHeaderAdd: {
    title: '是否显示表头新增',
    initialValue: true,
    description: '基本操作按钮（表头新增）(默认为true)',
    controlType: 'boolean',
  },
  showBasicOperationRowAdd: {
    title: '是否显示行新增',
    initialValue: true,
    description: '基本操作按钮（行新增）(默认为true)',
    controlType: 'boolean',
  },
  showBasicOperationRowDelete: {
    title: '是否显示行删除',
    initialValue: true,
    description: '基本操作按钮（行删除）(默认为true)',
    controlType: 'boolean',
  },
  showHeaderOperation: {
    title: '是否显示表头操作按钮',
    initialValue: false,
    description: '基本操作按钮（行删除）(默认为true)',
    controlType: 'boolean',
  },
  showRowNo: {
    title: '是否显示数据行序号',
    initialValue: true,
    controlType: 'boolean',
  },
  showRecordId: {
    title: '是否显示数据行的主键id',
    initialValue: true,
    controlType: 'boolean',
  },
  __advancedSettings__: {
    title: '高级表格配置',
    controlType: AdvancedSettings,
    collapseSettings: {
      virtualScroll: {
        title: '是否支持虚拟滚动',
        initialValue: false,
        controlType: 'boolean',
      },
      showCheckbox: {
        title: '是否显示勾选框',
        initialValue: false,
        description: '默认true',
        controlType: 'boolean',
      },
      editable: {
        title: '是否可编辑',
        initialValue: true,
        description: '默认true',
        controlType: 'boolean',
      },
      rowDraggable: {
        title: '是否允许数据行切换顺序',
        initialValue: true,
        description: '默认true',
        controlType: 'boolean',
      },
      headerColDraggable: {
        title: '是否允许列切换顺序',
        initialValue: true,
        description: '默认true',
        controlType: 'boolean',
      },
      headerColResizable: {
        title: '是否允许调整列宽',
        initialValue: true,
        description: '默认true',
        controlType: 'boolean',
      },
      allowSelectColumns: {
        title: '是否允许选择部分列显示',
        initialValue: false,
        description: '在【更多】下拉选内',
        controlType: 'boolean',
      },
      showPagination: {
        title: '是否显示分页',
        initialValue: true,
        description: '默认true',
        controlType: 'boolean',
      },
      pageSizeOptions: {
        initialValue: [10, 20, 50, 100, 200],
        title: '分页大小',
        description: '可自由输入和删除',
        controlType: 'tagSelect',
      },
      showQuickJumper: {
        title: '是否显示快速跳转至某页',
        initialValue: true,
        description: '默认true',
        controlType: 'boolean',
      },
      showSizeChanger: {
        title: '是否展示 pageSize 切换器',
        initialValue: true,
        description: '默认true',
        controlType: 'boolean',
      },
      showTotal: {
        title: '总数显示格式',
        // eslint-disable-next-line no-template-curly-in-string
        initialValue: '第${range0}~${range1}条，总数：${total}条',
        // eslint-disable-next-line no-template-curly-in-string
        description: '参考【第${range0}~${range1}条，总数：${total}条】',
        controlType: 'string',
      },
      allowExcelImportExport: {
        title: '是否允许导入导出',
        initialValue: true,
        description: '默认true',
        controlType: 'boolean',
      },
      onCheckImport: {
        title: '检查导入结果',
        description: '检查导入结果，判断是否导入成功',
        controlType: 'function',
      },
    },
  },
};

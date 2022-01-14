import { CustomProps, DynamicValueConfig } from '@@/Panels/PropertyDetail/Common';
import { Select } from 'antd';
import { allWidgets } from '@@/Elements/Widgets';
import FrontendFormulaConfig from './FrontendFormulaConfig';

const { Option } = Select;

const customConfig = {
  formula: {
    header: '前端公式',
    Component: FrontendFormulaConfig,
  },
  validateRules: {
    header: '校验规则',
    Component: DynamicValueConfig,
    ComponentProps: {
      acceptTypes: ['regExp', 'expression', 'function'],
    },
  },
  control: {
    header: '控件',
    Component: DynamicValueConfig,
    ComponentProps: {
      children: (
        <Select>
          {allWidgets.map(({ id, name }) => <Option key={id} value={id} >{name}</Option>)}
        </Select>
      ),
    },
  },
  defaultValue: {
    header: '默认值',
    Component: DynamicValueConfig,
  },
  editable: {
    header: '是否可编辑',
    Component: DynamicValueConfig,
  },
  required: {
    header: '是否必填',
    Component: DynamicValueConfig,
  },
};

export default function Field ({
  value,
  onChangeProps,
  ...additionProps
}: any) {
  return (
    <CustomProps
      types={['style', 'disabled', 'visible']}
      customConfig={customConfig}
      value={value}
      onChange={onChangeProps}
    />
  );
};

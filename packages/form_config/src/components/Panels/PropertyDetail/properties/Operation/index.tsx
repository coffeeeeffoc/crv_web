import { CustomProps, DynamicValueConfig, SimpleForm } from '@@/Panels/PropertyDetail/Common';
import { Select } from 'antd';
import panelStyles from '@@/Panel/TogglePanel/index.less';
import SwitchInForm from '@rc/SwitchInForm';

const { Option } = Select;

const ButtonProps = ({
  value,
  onChange,
}: any) => {
  const items = [
    {
      label: '类型',
      name: 'type',
      content: (
        <DynamicValueConfig>
          <Select
            dropdownClassName={panelStyles.dropdown}
          >
            <Option value='primary' >primary</Option>
            <Option value='ghost' >ghost</Option>
            <Option value='dashed' >dashed</Option>
            <Option value='link' >link</Option>
            <Option value='text' >text</Option>
            <Option value='default' >default</Option>
          </Select>
        </DynamicValueConfig>
      ),
    }, {
      label: '危险',
      name: 'danger',
      content: (
        <DynamicValueConfig>
          <SwitchInForm
            checkedChildren='是'
            unCheckedChildren='否'
            defaultChecked={false}
          />
        </DynamicValueConfig>
      ),
    },
  ];
  return (
    <SimpleForm {...{
      value,
      onChange,
      items,
    }} />
  );
};

const customConfig = {
  buttonProps: {
    header: '按钮属性',
    Component: ButtonProps,
  },
};

export default function Operation ({
  value,
  onChange,
  onChangeProps,
  ...additionProps
}: any) {
  return (
    <CustomProps
      types={['style', 'disabled', 'visible']}
      customConfig={customConfig}
      value={value}
      onChange={(val: any) => {
        onChange?.(val);
        onChangeProps?.(val);
      }}
    />
  );
};

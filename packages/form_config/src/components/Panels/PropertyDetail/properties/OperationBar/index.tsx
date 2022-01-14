import { CustomProps, SimpleForm, DynamicValueConfig } from '@@/Panels/PropertyDetail/Common';
import Operation from '../Operation';
import { produce } from 'immer';
import panelStyles from '@@/Panel/TogglePanel/index.less';
import { Select, InputNumber } from 'antd';
import { useOperationsConfig } from '@/hooks/business/useConfig';

const { Option } = Select;

interface OperationPropsType {
  operations: any[];
  onChangeProps: (val: any) => void;
};
export const OperationProps = ({
  operations,
  onChangeProps
}: OperationPropsType) => {
  return operations.map(({ id, name, props }: any, index) => (
    <Operation
      key={id}
      value={props}
      onChangeProps={(val: any) => onChangeProps({
        operations: produce(operations, draft => {
          draft[index].props = val;
        }),
      })}
      />
  ));
};

export const defaultOperationBarProps = {
  space: {
    justifyContent: {
      _$type: 'default',
      _$content: 'flex-end',
    },
    gap: {
      _$type: 'default',
      _$content: 20,
    },
  },
};

interface OperationBarProps {
  value?: any;
  onChange: (val: any) => void;
  onChangeAddition: (val: any) => void;
  onChangeProps: (val: any) => void;
  operations?: any[];
};
const SpaceConfig = ({
  value,
  onChange,
}: any) => {
  const items = [
    {
      label: '水平对齐',
      name: 'justifyContent',
      content: (
        <DynamicValueConfig>
          <Select
            dropdownClassName={panelStyles.dropdown}
          >
            <Option value='start' >start</Option>
            <Option value='end' >end</Option>
            <Option value='center' >center</Option>
            <Option value='stretch' >stretch</Option>
            <Option value='left' >left</Option>
            <Option value='right' >right</Option>
            <Option value='space-between' >space-between</Option>
            <Option value='space-around' >space-around</Option>
            <Option value='space-evenly' >space-evenly</Option>
          </Select>
        </DynamicValueConfig>
      ),
    },
    {
      label: '垂直对齐',
      name: 'alignItems',
      content: (
        <DynamicValueConfig>
          <Select
            dropdownClassName={panelStyles.dropdown}
          >
            <Option value='start' >start</Option>
            <Option value='end' >end</Option>
            <Option value='center' >center</Option>
            <Option value='stretch' >stretch</Option>
          </Select>
        </DynamicValueConfig>
      ),
    },
    {
      label: '方向',
      name: 'flexDirection',
      content: (
        <DynamicValueConfig>
          <Select
            dropdownClassName={panelStyles.dropdown}
          >
            <Option value='row' >row</Option>
            <Option value='column' >column</Option>
          </Select>
        </DynamicValueConfig>
      ),
    },
    {
      label: '间距',
      name: 'gap',
      content: (
        <DynamicValueConfig>
          <InputNumber />
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
  space: {
    header: '子元素布局',
    Component: SpaceConfig,
  },
};

export default function OperationBar ({
  value = defaultOperationBarProps,
  onChange,
  onChangeAddition,
  onChangeProps,
  operations = [],
}: OperationBarProps) {
  const hasOperations = operations.length > 0;
  const operationsConfig = useOperationsConfig();
  const panelChildren = hasOperations
    ? {
        operationsProps: {
          header: '操作属性',
          children: (
            <CustomProps {...{
              value: operations.reduce((res: any, { id, name, props }: any, index) => {
                return {
                  ...res,
                  [id]: { ...props },
                };
              }, {}),
              customConfig: operations.reduce((res: any, { id, props }: any, index) => {
                const { name } = operationsConfig.find(item => item.id === id) ?? {};
                return {
                  ...res,
                  [id]: {
                    header: name,
                    Component: Operation,
                    ComponentProps: {
                      onChangeProps: (values: any) => {
                        onChangeAddition({
                          operations: produce(operations, draft => { draft[index].props = values; })
                        });
                      },
                    },
                  }
                };
              }, {}),
            }}/>
          ),
        },
      }
    : undefined;
  return (
    <CustomProps
      types={['style', 'disabled', 'visible']}
      customConfig={customConfig}
      value={value}
      onChange={(val: any) => {
        onChange?.(val);
        onChangeProps(val);
      }}
      panelChildren={panelChildren}
    />
  );
};

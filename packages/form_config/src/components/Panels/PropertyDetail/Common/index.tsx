import { Form, Select, Collapse, Input, Space, Button, InputNumber, Popover } from 'antd';
import { useEffect, useState, useRef, forwardRef } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import panelStyles from '@@/Panel/TogglePanel/index.less';
import { produce } from 'immer';
import { TypeSwitchableControl } from '@@/DynamicSetting';
import Editor from '@@/Editor';
import styles from './index.less';
import { tryParse } from '@utils/browser/utils';
import useThrottle from '@utils/browser/hooks/useThrottle';
import { useResetFormValue } from '@rc/hooks/basic';

const { Option } = Select;
const { Panel } = Collapse;

export const allStyleProps = Object.keys(document.body.style);

export const StyleItem = ({
  value = [],
  onChange,
  currentValue = {},
  focusItemRef,
}: any) => {
  const [key, val] = value;
  const [searchValue, setSearchValue] = useState('');
  return (
    <Space size={10} >
      <Select
        showSearch
        value={key}
        searchValue={searchValue}
        dropdownClassName={panelStyles.dropdown}
        onSearch={setSearchValue}
        filterSort={(a, b) => {
          return a.value.toLowerCase().indexOf(searchValue.toLowerCase()) - b.value.toLowerCase().indexOf(searchValue.toLowerCase());
        }}
        onChange={k => onChange([k, val])}
        style={{ width: 120 }}
      >
        {allStyleProps.filter(key => !(key in currentValue)).map(item => <Option key={item} value={item} >{item}</Option>)}
      </Select>
      <Input ref={focusItemRef} value={val} onChange={e => onChange([key, e.target.value])} />
      <MinusCircleOutlined onClick={() => onChange(null)} style={{ cursor: 'pointer' }} />
    </Space>
  );
};
export const StyleItems = ({
  value = {},
  onChange,
}: {
  value?: {
    [key: string]: string;
  };
  onChange: (val: any) => void;
}) => {
  const hasEmptyRef = useRef(false);
  const focusKeyRef = useRef('');
  const focusItemRef = useRef<any>(null);
  useEffect(() => {
    if (focusKeyRef.current) {
      focusItemRef.current?.focus();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKeyRef.current]);
  return (
    <Space size={10} direction='vertical' style={{ width: '100%' }} >
      {Object.keys(value).concat(hasEmptyRef.current ? [''] : []).map((key, index) => (
        <StyleItem
          key={key}
          {...(focusKeyRef.current === key && { focusItemRef })}
          value={[key, value[key]]}
          currentValue={value}
          onChange={(val: string[]) => {
            onChange(produce(value, (draft) => {
              if (Array.isArray(val)) {
                const [k, v] = val;
                if (key === '') {
                  hasEmptyRef.current = false;
                  draft[k] = v;
                  focusKeyRef.current = k;
                } else if (key !== k) {
                  focusKeyRef.current = k;
                  return Object.keys(draft).reduce((res: any, item) => {
                    if (item === key) {
                      res[k] = v;
                    } else {
                      res[item] = draft[item];
                    }
                    return res;
                  }, {});
                } else {
                  draft[k] = v;
                }
              } else if (val === null) {
                if (key === '') {
                  hasEmptyRef.current = false;
                }
                delete draft[key];
              }
            }));
          }}
        />
      ))}
      <Button
        type='dashed'
        block={true}
        onClick={() => {
          hasEmptyRef.current = true;
          onChange({
            ...value,
          });
        }}
      ><PlusOutlined/>新增</Button>
    </Space>
  );
};

export const SimpleForm = ({
  value,
  onChange,
  items,
}: any) => {
  const [form] = Form.useForm();
  useResetFormValue(value, form);
  return (
    <Form
      form={form}
      component={false} // 为了避免form嵌套，此处不渲染DOM元素form，但不影响内部元素的创建
      onValuesChange={(changedValues, allValues) => {
        onChange(allValues);
      }}
    >
      {items.map(({ label, name, content }: any) => (
        <Form.Item
          key={name}
          label={label}
          name={name}
          labelCol={{
            span: 6,
          }}
          labelAlign='left'
        >
          {content}
        </Form.Item>
      ))}
    </Form>
  );
};

// 布尔值选择器
export const BoolSelector = forwardRef(({
  value,
  onChange,
  ...rest
}: any, ref) => {
  useEffect(() => {
    if (typeof value !== 'boolean') {
      console.error(`BoolSelector的props.value的值不是boolean，而是${value}`);
    }
  }, [value]);
  return (
    <Select {...{
      ref,
      value: JSON.stringify(value),
      onChange: (val: any) => {
        onChange(tryParse(val));
      },
      ...rest,
    }} >
      <Option value='false' >否</Option>
      <Option value='true' >是</Option>
    </Select>
  );
});

const PopOverEditor = (props: any) => (
  <Popover
    overlayClassName={styles.popover}
    placement='left'
    content={(
      <Editor
        {...props}
        style={{
          width: 550,
          height: 450,
        }}
      />
    )}
  >
    <Input {...props} />
  </Popover>
);

// 表达式基本类型与控件映射关系
export const basicTypeConfig: any = {
  number: ['数字', InputNumber],
  string: ['字符串', Input],
  json: ['JSON', PopOverEditor, { mode: 'json' }],
  boolean: ['布尔', BoolSelector],
  expression: ['表达式', Input],
  function: ['函数', PopOverEditor, { mode: 'javascript' }],
  regExp: ['正则', Input],
};

// 默认可切换的类型
export const defaultAcceptTypes = ['expression', 'function'];

// 动态值配置
export const DynamicValueConfig = ({
  value,
  onChange,
  // 自定义配置，允许在预置的配置的基础上添加新的配置
  customConfig = {},
  // 接受的类型，参数为空时默认为defaultAcceptTypes
  acceptTypes = defaultAcceptTypes,
  // 不切换类型时原生的控件，在本组件下统一表现为自动在acceptTypes中添加'default'
  children,
}: any) => {
  const newAcceptTypes = Object.keys(customConfig).concat(acceptTypes);
  const newConfig = {
    ...basicTypeConfig,
    ...customConfig,
  };
  return (
    <TypeSwitchableControl {...{
      value,
      onChange,
      children,
      config: newAcceptTypes.reduce((res: any, type: any) => {
        type in newConfig && (res[type] = newConfig[type]);
        return res;
      }, {}),
    }}/>
  );
};

export const config: any = {
  style: {
    header: '样式设置',
    Component: StyleItems,
  },
  disabled: {
    header: '禁用与否',
    Component: DynamicValueConfig,
    ComponentProps: {
      acceptTypes: ['boolean', ...defaultAcceptTypes],
    },
  },
  visible: {
    header: '可见性',
    Component: DynamicValueConfig,
    ComponentProps: {
      acceptTypes: ['boolean', ...defaultAcceptTypes],
    },
  },
};

interface CustomPropsProps {
  // 指定默认config中的类型
  types?: string[];
  // 指定自定义类型以及自动以配置，这些自定义类型会作为表单项，被form管理，onChange时作为整体联动
  customConfig?: {
    [key: string]: {
      header: string;
      Component: React.FC;
      ComponentProps?: { [key: string]: any };
    };
  };
  // 表单管理的值以及值变动时的回调
  value?: any;
  onChange?: (val: any) => void;
  // 子节点，不作为表单项
  panelChildren?: {
    [key: string]: {
      header: string;
      children: React.ReactNode;
    };
  };
};

export const CustomProps = ({
  types = [],
  customConfig = {},
  value,
  onChange,
  panelChildren = {},
}: CustomPropsProps) => {
  const [form] = Form.useForm();
  const newConfig = {
    ...config,
    ...customConfig,
  };
  const allTypes = [...types, ...Object.keys(customConfig), ...Object.keys(panelChildren)];
  const newTypes = [...types, ...Object.keys(customConfig)];
  useResetFormValue(value, form);
  const onValuesChange = useThrottle((changedValues: any, allValues: any) => {
    onChange?.(allValues);
  }, 50);
  return (
    <Form
      component={false}
      form={form}
      onValuesChange={onValuesChange}
    >
      <Collapse defaultActiveKey={allTypes} >
        {newTypes.map((type: string) => {
          const detail = newConfig[type];
          return detail
            ? (
                <Panel key={type} header={detail.header}>
                  <Form.Item label='' name={type} >
                    <detail.Component {...detail.ComponentProps} />
                  </Form.Item>
                </Panel>
              )
            : null;
        })}
        {Object.keys(panelChildren).map(key => (
          <Panel key={key} header={panelChildren[key].header}>
            {panelChildren[key].children}
          </Panel>
        ))}
      </Collapse>
    </Form>
  );
};

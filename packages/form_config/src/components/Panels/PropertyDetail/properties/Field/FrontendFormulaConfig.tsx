import { Form, Input, Button, Space, Select } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
// import { useResetFormValue } from '@rc/hooks/basic';

// 触发类型（触发方式，改动）
export enum EnumTriggerType {
  // 先触发主动后触发被动
  activeAndPassive = 'activeAndPassive',
  // 先触发被动后触发主动
  passiveAndActive = 'passiveAndActive',
  // 只触发被动
  passive = 'passive',
  // 只触发主动
  active = 'active',
  // 不参与触发
  none = 'none',
};

// 公式的启用类型
export enum EnumEnableType {
  // 不启用公式
  none = 'none',
  // 启用主动公式和被动公式
  all = 'all',
  // 只启用被动公式
  passive = 'passive',
  // 只启用主动公式
  active = 'active',
};

// 前端公式的主动触发
export interface FormulaActiveType {
  target: string;
  formula: string;
};

// 值变化类型
enum EnumValueChangeType {
  // 空值（没默认值）
  empty = 'empty',
  // 默认值
  default = 'default',
  // 表单初始值（后面可能会区分统一赋初始值和单独赋初始值【多对多关联和一对多关联】）
  initial = 'initial',
  // 统一赋初始值
  // initialUnify = 'initialUnify',
  // 单独赋初始值【多对多关联和一对多关联】
  // initialAlone = 'initialAlone',
  // 手动修改值
  onChange = 'onChange',
  // 联动导致的变化
  linkage = 'linkage',
  // 主动联动触发和被动联动触发
  activeLinkage = 'activeLinkage',
  passiveLinkage = 'passiveLinkage',
};

// 执行时机
enum EnumExecuteTime {
  // 自动触发，当公式中包含的字段的值发生变化时触发
  auto = 'auto',
  // 仅当所依赖的字段被手动修改时触发
  onDepsChange = 'onDepsChange',
  // 当condition公式满足时触发，在condition中包含的字段的值发生变化时触发
  condition = 'condition',
  // 选择几个特定的时机
  specificTimes = 'specificTimes',
  // 任何时候都会触发
  always = 'always',
};
// 前端公式的被动触发
export interface FormulaConfigType {
  // 触发类型
  triggerType: EnumTriggerType;
  // 启用类型
  enableType: EnumEnableType;
  // 主动触发，可以指定多个
  active?: FormulaActiveType[];
  // 被动公式
  formula?: string;
  // 执行时机
  executeTime?: EnumExecuteTime;
  // 当executeTime为condition时生效，表示仅当满足某个条件时
  condition?: string;
  // 当executeTime为specificTimes时生效，用户选择某些时机来触发
  specificTimes?: EnumValueChangeType[];
  // 是否允许循环依赖
  allowCircularDeps?: boolean;
};

const initialEnableType = EnumEnableType.all;
const initialTriggerType = EnumTriggerType.activeAndPassive;

export const FrontendFormulaConfig = ({
  value,
  onChange,
}: any) => {
  const [enableType, setEnableType] = useState<EnumEnableType>(value?.enableType ?? initialEnableType);
  const [form] = Form.useForm();
  // useResetFormValue(value, form);
  useEffect(() => {
    form.setFieldsValue(value);
    setEnableType(value?.enableType ?? initialEnableType);
  }, [value, form]);
  return (
    <Form
      form={form}
      component={false}
      initialValues={value}
      onValuesChange={(changedValues, values) => {
        onChange(values);
      }}
    >
      <Form.Item name='enableType' label='启用类型' initialValue={initialEnableType} >
        <Select
          defaultValue={EnumEnableType.passive}
          onChange={(v: any) => {
            // 此处在切换类型时，不去把formula，active等无用的项删除；方便配置人员切换触发类型后再切换来还能保留公式数据
            setEnableType(v);
            form.setFieldsValue({
              enableType: v,
            });
          }}
          options={[
            { value: EnumEnableType.none, label: '不设置公式' },
            { value: EnumEnableType.passive, label: '只设置被动公式' },
            { value: EnumEnableType.active, label: '只设置主动公式' },
            { value: EnumEnableType.all, label: '设置主动公式和被动公式' },
          ]}
        />
      </Form.Item>
      {[EnumEnableType.active, EnumEnableType.all].includes(enableType) && (
        <Form.List name='active' >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item {...restField} name={[name, 'target']}>
                    <Input placeholder='目标字段' style={{ width: 100 }} />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'formula']}>
                    <Input placeholder='目标公式表达式' />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type='dashed' block onClick={() => add()} icon={<PlusOutlined />} >新增主动公式</Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      )}
      {[EnumEnableType.passive, EnumEnableType.all].includes(enableType) && (
        <Form.Item name='formula' label='被动公式' >
          <Input />
        </Form.Item>
      )}
      <Form.Item name='triggerType' label='触发类型' initialValue={initialTriggerType} >
        <Select
          defaultValue={EnumTriggerType.passive}
          options={[
            { value: EnumTriggerType.none, label: '不触发' },
            { value: EnumTriggerType.passive, label: '只触发被动公式' },
            { value: EnumTriggerType.active, label: '只触发主动公式' },
            { value: EnumTriggerType.passiveAndActive, label: '先触发被动后触发主动' },
            { value: EnumTriggerType.activeAndPassive, label: '先触发主动后触发被动' },
          ]}
        />
      </Form.Item>
    </Form>
  );
};

export default FrontendFormulaConfig;

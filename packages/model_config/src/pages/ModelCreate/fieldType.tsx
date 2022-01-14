import React from 'react'
import { Select, Checkbox, InputNumber } from 'antd'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'

interface modelFormRightFieldsType {
  // 标题
  title: string
  // 名称
  name: string
  // 返回的控件
  control: React.ReactNode
  // 过度给Form.Item的属性
  itemProps: {
    valuePropName?: string
    [propsName: string]: any
  }
}
const { Option } = Select

// Base右侧的复选框数据
export const modelFormRightFields: modelFormRightFieldsType[] = [
  {
    title: ' ',
    name: 'exportData',
    control: <Checkbox>导出模块配置的同时导出表数据</Checkbox>,
    itemProps: { valuePropName: 'checked' }
  },
  {
    title: ' ',
    name: 'ruleDataSource',
    control: <Checkbox>可作为规则配置中的数据源表</Checkbox>,
    itemProps: { valuePropName: 'checked' }
  },
  {
    title: ' ',
    name: 'ruleTarget',
    control: <Checkbox>可作为规则配置中的目标表</Checkbox>,
    itemProps: { valuePropName: 'checked' }
  },
  {
    title: ' ',
    name: 'ruleDictionary',
    control: <Checkbox>可作为规则配置中的字典表</Checkbox>,
    itemProps: { valuePropName: 'checked' }
  },
  {
    title: ' ',
    name: 'reportDataSource',
    control: <Checkbox>可作为报表配置中的数据源表</Checkbox>,
    itemProps: { valuePropName: 'checked' }
  }
]

// Base左侧的数据布局
export const fields: modelFormRightFieldsType[] = [
  {
    title: 'ID(数据库表名)',
    name: 'id',
    control: <InputWithLength placeholder='请输入ID' maxLength={30} />,
    itemProps: {
      rules: [
        { required: true, message: 'ID(数据库表名)不能为空' },
        { pattern: /^[a-z][0-9a-z_]*$/, message: '由英文小写字母，数字和下划线\'_\'组成，仅可以小写字母开头' }]
    }
  },
  {
    title: '名称',
    name: 'name',
    control: <InputWithLength placeholder='请输入名称' maxLength={20} />,
    itemProps: {}
  },
  {
    title: '类型',
    name: 'type',
    control: (<Select placeholder='请选择类型'>
      <Option value='ENTITY' key='entity'>实体</Option>
    </Select>),
    itemProps: {
      rules: [
        { required: true, message: '类型为必选项' }
      ],
      initialValue: 'ENTITY'
    }
  },
  {
    title: '所属模块',
    name: 'module',
    control: (<Select placeholder='请选择所属模块'>
      <Option value='core' key='core'>core</Option>
      <Option value='income' key='income'>income</Option>
      <Option value='getData' key='getData'>getData</Option>
      <Option value='reportConfig' key='reportConfig'>reportConfig</Option>
    </Select>),
    itemProps: {
      rules: [
        { required: true, message: '所属模块为必选项' }
      ],
      initialValue: 'core'

    }
  },
  {
    title: '',
    name: 'stringId',
    control: <Checkbox>ID字段使用字符串类型</Checkbox>,
    itemProps: { valuePropName: 'checked' }
  },
  {
    title: 'ID字段的长度',
    name: 'idLength',
    control: <InputNumber placeholder='请输入 ID字段的长度' style={{ width: '100%' }} precision={0} />,
    itemProps: {},
  }
]

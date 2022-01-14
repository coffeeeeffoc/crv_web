import React, { FC, useEffect } from 'react';
import { Divider, Space, Button, Form, Input } from 'antd';
import { FilterOutlined, SortAscendingOutlined, SortDescendingOutlined, SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons';
import SingleSelect from './controls/SingleSelect';
import styles from './style.less';
import { DateRangePicker } from '@/components/FilterBar/ComplexFilter/controls/DateTimePicker';
import { NumberRange } from '@/components/FilterBar/ComplexFilter/controls/NumberInput';
import EnumSelect from '@/components/FilterBar/ComplexFilter/controls/EnumSelect';

export interface DropDownContentProps {
  fieldType?: string
  value: any
  onClose: (params?: any) => void
  [key: string]: any
}

const getFilterControl = (fieldType: string | undefined, config: any = {}) => {
  switch (fieldType) {
    case 'TEXT': { return <Input /> }
    case 'LONG_TEXT': { return <Input.TextArea /> }
    case 'INTEGER':
    case 'DECIMAL':
    case 'PERCENTAGE':
    case 'PERMILLAGE':
    case 'CURRENCY': { return <NumberRange /> }
    case 'DATE_TIME':
    case 'DATE':
    case 'YEAR':
    case 'YEAR_MONTH':
    case 'TIME': { return <DateRangePicker config={{ fieldType }} /> }
    case 'ENUM': { return <EnumSelect style={{ width: 200 }} fieldList={[]} config={config} /> }
    default: { return <Input /> }
  }
}

const DropDownContent: FC<DropDownContentProps> = ({ value, fieldType, onClose, ...config }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(value)
  }, [form, value])

  const onFinish = (values: any) => {
    console.info('filters', values)
    onClose({ ...values, fieldType })
  }

  const onReset = () => {
    form.resetFields();
    onClose(null);
  };

  return (
    <div>
      <Form form={form} className={styles.dropContent} onFinish={onFinish}>
        <Form.Item name="sort">
          <SingleSelect options={[{ value: 'asc', label: <span><SortAscendingOutlined style={{ marginRight: 10 }} />升序</span>, style: { width: '100%', lineHeight: '20px', height: 20 } }, { value: 'desc', label: <span><SortDescendingOutlined style={{ marginRight: 10 }} />降序</span>, style: { width: '100%', lineHeight: '20px', height: 20 } }]} />
        </Form.Item>
        <Divider style={{ margin: '5px 0' }} />
        <Form.Item name="fixed">
          {/* <Checkbox>冻结列{fieldType}</Checkbox> */}
          <SingleSelect options={[{ value: 'left', label: <span><SwapLeftOutlined style={{ marginRight: 10 }} />冻结到左列</span>, style: { width: '100%', lineHeight: '20px', height: 20 } }, { value: 'right', label: <span><SwapRightOutlined style={{ marginRight: 10 }} />冻结到右列</span>, style: { width: '100%', lineHeight: '20px', height: 20 } }]} />
        </Form.Item>
        <Divider style={{ margin: '5px 0' }} />
        <Form.Item name="filter" labelCol={{ span: 24 }} label={<span><FilterOutlined style={{ marginRight: 10 }} />筛选</span>}>
          {getFilterControl(fieldType, config)}
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: 'right' }}>
            <Space style={{ marginTop: 10, textAlign: 'right' }}>
              <Button size="small" onClick={onReset}>重置</Button>
              <Button type="primary" htmlType="submit" size="small">确定</Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default DropDownContent;

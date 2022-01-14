import { FC, useState, useEffect } from 'react';
import { Select, Button, Input, Space } from 'antd';
import { StopOutlined, FilterFilled, SyncOutlined } from '@ant-design/icons';
import ComplexFilterModal from './ComplexFilterModal';
import styles from './styles.less';

const { Option } = Select;

export interface FilterBarProps {
  fieldList: Array<{ text: string; value: string | number }>;
  value: any;
  onChange: (...arg: any) => void;
  selectProps?: any;
  inputProps?: any;
}

/**
 * 列表页面筛选工具条
 */
const FilterBar: FC<FilterBarProps> = ({ fieldList, value = [], onChange, selectProps = {}, inputProps = {} }) => {
// const FilterBar: FC<FilterBarProps> = ({ fieldList, value = {}, onChange, selectProps = {}, inputProps = {} }) => {
  const temp = JSON.stringify(value);
  console.log('filterBar', value, fieldList, temp);

  const [visible, setVisible] = useState<boolean>(false);
  const [fields, setFields] = useState<string[]>(value);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    setFields(value);
    // setContent(value.content)
  }, [temp])

  const onSearch = () => {
    if (onChange) {
      onChange({ type: 'SIMPLE', fields, content })
    }
  }

  const onReset = () => {
    setFields([]);
    setContent('');
    if (onChange) {
      onChange({})
    }
  }

  const onComplexFilterChange = (val: any) => {
    if (onChange) {
      onChange(val)
    }
  }

  const color = value.type !== 'COMBIN' ? '#1890FF' : '#6cef7c';

  const InputAddonBefore = <Select
    value={fields}
    id='FILTERFIELD'
    allowClear
    className="filterField"
    bordered={false}
    // maxTagTextLength={4}
    maxTagCount={2}
    mode="multiple"
    maxTagPlaceholder='更多字段...'
    placeholder="检索字段选择"
    style={{ width: 250 }}
    onChange={(val: any) => setFields(val)}
    {...selectProps}>
    {
      fieldList.map((item: { value: string | number; text: string }) => <Option key={item.value} value={item.value}>{item.text}</Option>)
    }
  </Select>

  const InputAddonAfter = <Space>
    <Button id='SENIOR_FILTER' key='SENIOR_FILTER' style={{ backgroundColor: color, borderColor: color }} type="primary" icon={<FilterFilled />} size="small" onClick={() => setVisible(true)} />
    <Button id='REFRESH' key='REFRESH' type="primary" icon={<SyncOutlined />} size="small" onClick={onSearch} />
    <Button id='RESET' key='RESET' type="primary" icon={<StopOutlined />} size="small" onClick={onReset} />
  </Space>

  return (
    <>
      <Input
        className={styles.FilterBar}
        id='FUZZY_SCREEN'
        onPressEnter={onSearch}
        addonBefore={InputAddonBefore}
        addonAfter={InputAddonAfter}
        onChange={(e) => setContent(e.target.value)}
        value={content}
        {...inputProps}
      />
      <ComplexFilterModal
        fieldList={fieldList}
        value={value}
        visible={visible}
        onCancel={() => setVisible(false)}
        onChange={onComplexFilterChange}
      />
    </>
  )
}

export default FilterBar

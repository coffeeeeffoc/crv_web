import { forwardRef, useCallback } from 'react'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'
import { AlignEnglish, AlignChinese, TableShowName } from './constant'
import FrontFormula from '@/components/Formula/FrontFormulaEdit'
import { Input, Select, AutoComplete, InputNumber } from 'antd'
const { Option } = Select

export default ({
  refFieldItems,
  fieldItem
}: any) => {
  return forwardRef((propsType: any, ref: any): any => {
    const {
      onPressEnter,
      onBlur,
      dataIndex,
      value,
      record,
      onChange,
      ...rest
    } = propsType
    const result = {
      value,
      onChange,
      ...rest,
    }
    const selectOnChange = useCallback((val: any) => {
      onChange(val)
      onBlur()
    }, [onChange, onBlur])
    switch (record.attribute) {
      case TableShowName.CONTENT:
        return (
          <FrontFormula save={onBlur} fieldItems={refFieldItems} {...result} />
        )
      case TableShowName.CONTENT_FORMAT:
        return <AutoComplete
          dropdownClassName="certain-category-search-dropdown"
          ref={ref}
          onBlur={onBlur}
          defaultOpen
          {...result}
          options={[{ value: '合计:${}金额' }]}
        >
        </AutoComplete>
      case TableShowName.SUMMARY:
        return (
          <FrontFormula {...result} ref={ref} save={onBlur} fieldItems={fieldItem} />
        )
      case TableShowName.SUMMARY_FORMAT:
        return <AutoComplete
          dropdownClassName="certain-category-search-dropdown"
          ref={ref}
          onBlur={onBlur}
          defaultOpen
          {...result}
          options={[{ value: '合计:${}金额' }]}
        >
        </AutoComplete>
      case TableShowName.COLUMN_WIDTH:
        return <InputNumber ref={ref} onPressEnter={onPressEnter} onBlur={onBlur} max={1000} style={{ width: '100%' }} min={0} {...result} />
      case TableShowName.SHOW_NAME:
        return <InputWithLength ref={ref} maxLength={20} onPressEnter={onPressEnter} onBlur={onBlur} autoComplete='off' {...result} />
      case TableShowName.HEADER_ALIGN:
        return <Select defaultOpen ref={ref} {...result} onBlur={onBlur} onChange={selectOnChange}>
          <Option value={AlignEnglish.LEFT} key={AlignEnglish.LEFT}>{AlignChinese.LEFT}</Option>
          <Option value={AlignEnglish.CENTER} key={AlignEnglish.CENTER}>{AlignChinese.CENTER}</Option>
          <Option value={AlignEnglish.RIGHT} key={AlignEnglish.RIGHT}>{AlignChinese.RIGHT}</Option>
        </Select>
      case TableShowName.CONTENT_ALIGN:
        return <Select defaultOpen ref={ref} {...result} onBlur={onBlur} onChange={selectOnChange}>
          <Option value={AlignEnglish.LEFT} key={AlignEnglish.LEFT}>{AlignChinese.LEFT}</Option>
          <Option value={AlignEnglish.CENTER} key={AlignEnglish.CENTER}>{AlignChinese.CENTER}</Option>
          <Option value={AlignEnglish.RIGHT} key={AlignEnglish.RIGHT}>{AlignChinese.RIGHT}</Option>
        </Select>
      default:
        return <Input ref={ref} onPressEnter={onPressEnter} onBlur={onBlur} />
    }
  })
}

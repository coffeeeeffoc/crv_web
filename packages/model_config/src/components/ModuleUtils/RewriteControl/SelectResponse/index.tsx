import { FC, useCallback } from 'react'
import { Select, Spin } from 'antd'
interface SelectResponseProps {
  page: number
  total: number
  [propsName: string]: any
}
const SelectResponse: FC<SelectResponseProps> = (props) => {
  const {
    value,
    onChange,
    items = [],
    selectLoading = false,
    total,
    page,
    setPage,
    setModelValue = () => { },
    ...restProps
  } = props

  const companyScroll = useCallback((e: any) => {
    const { clientHeight, scrollHeight, scrollTop } = e.target
    if ((Number(clientHeight) + Number(scrollTop) + 1 > Number(scrollHeight)) && (Math.ceil(total / 15) > page)) {
      setPage(page + 1)
    }
  }, [setPage, page, total])

  const SelectOnChange = useCallback((e: string) => {
    onChange(e)
    setModelValue(e)
  }, [onChange, setModelValue])

  const option = items.map((item: any) => ({
    key: item.id,
    value: item.id,
    label: `${item.name ?? item.id}(${item.id})`,
  }))

  return (
    <Select
      value={value}
      onChange={SelectOnChange}
      filterOption={(inputValue: string, option: any) => {
        return String(option.label).includes(inputValue)
      }}
      showSearch
      loading={selectLoading}
      // virtual={false}
      placeholder='Search to Select'
      dropdownRender={menu => (
        <div>
          {menu}
          <div className='selectScroll' style={{ textAlign: 'center', height: 1 }} onMouseDown={e => e.preventDefault()}>
            {
              selectLoading && <Spin size='small' style={{ padding: '8px' }} />
            }
          </div>
        </div>
      )}
      onPopupScroll={companyScroll}
      options={option}
      {...restProps}
    // open={true}
    />
  )
}

export default SelectResponse

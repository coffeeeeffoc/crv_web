import { useState, useEffect } from 'react'
import { Form, Select, Radio, message } from 'antd'
import { EnumInnerPageType, operateTypeConfig } from '../../constants'
import API_URL from '@/services/apiUrlConstants'
import { post } from '@utils/browser/request'
import { usePrevious } from '@/hooks/usePrevious'

const { Option } = Select

const SwitchListOrFormItems = ({ form, disabled, currentModel }: any) => {
  const [modelId, setModelId] = useState(form.getFieldValue('modelId') ?? currentModel)
  const [models, setModels] = useState([])
  const [views, setViews] = useState([])
  const [forms, setForms] = useState([])
  const isModelIdChange = usePrevious(modelId) !== modelId
  useEffect(() => {
    console.info('disabled=', disabled)
    if (!disabled) {
      // 请求model，获取总条数
      post(API_URL.ASSOCIATE_TABLE, { filter: { retrieveCondition: '' }, pagination: { page: 1, pageSize: 1 } }).then((res: any) => {
        console.log('api_url', res)
        if (res.status === 200) {
          const { result: { total = 0 } } = res.data
          post(API_URL.ASSOCIATE_TABLE, { filter: { retrieveCondition: '' }, pagination: { page: 1, pageSize: total } }).then((res1: any) => {
            const { result: { list } } = res1.data
            const models = list?.map((m: any) => ({ value: m.id, text: m.name })) ?? []
            setModels(models)
          }).catch((err: any) => {
            console.log('rej', err)
          })
        } else {
          message.error(res.message ?? '模型获取失败')
        }
      }).catch((rej: any) => {
        console.log('rej', rej)
      })
    }
  }, [disabled])

  useEffect(() => {
    if (modelId) {
      if (isModelIdChange) {
        form.setFieldsValue({ viewId: undefined, formId: undefined })
      }
      post(API_URL.RETRIEVE_REQUIRE, { modelId, views: [], forms: [] }).then((res: any) => {
        if (res.status === 200) {
          const { result: list } = res.data
          if (list?.length > 0) {
            const item = list[0]
            const views = item.views?.map((v: any) => ({ value: v.id, text: v.name })) ?? []
            const forms = item.forms?.map((f: any) => ({ value: f.id, text: f.name })) ?? []
            setViews(views)
            setForms(forms)
          }
        }
      })
    }
    // 查询视图和表单
  }, [modelId, form, isModelIdChange])

  return (
    <div style={{ marginLeft: 20 }}>
      <Form.Item label='模型:' name='modelId' initialValue={currentModel} rules={[{ required: !disabled, message: '模型不能为空' }]}>
        <Select showSearch
          style={{ width: '50%' }}
          disabled={disabled}
          placeholder='请选择模型'
          filterOption={(inputValue: string, option: any) => {
            return String(option.children).includes(inputValue)
          }}
          onChange={(val: string) => setModelId(val)}>
          {
            models.map(({ value, text }: any) => <Option key={value} value={value}>{`${text ?? value}(${value})`}</Option>)
          }
        </Select>
      </Form.Item>
      <Form.Item name='innerPageType' key='innerPageType' initialValue={EnumInnerPageType.VIEW}>
        <Radio.Group disabled={disabled}>
          <Radio value={EnumInnerPageType.VIEW}>视图</Radio>
          <Radio value={EnumInnerPageType.FORM}>表单</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item noStyle shouldUpdate={(prevValue, curValue) => prevValue.innerPageType !== curValue.innerPageType}>
        {({ getFieldValue }) => {
          const type = getFieldValue('innerPageType')
          return type === EnumInnerPageType.VIEW
            ? (
              <>
                <Form.Item label='视图:' key='viewId' name='viewId' rules={[{ required: !disabled, message: '视图不能为空' }]}>
                  <Select
                    style={{ width: '50%' }}
                    showSearch
                    filterOption={(inputValue: string, option: any) => {
                      return String(option.children).includes(inputValue)
                    }}
                    disabled={disabled}
                    placeholder='请选择视图'>
                    {
                      views.map(({ value, text }: any) => <Option key={value} value={value}>{`${text ?? value}(${value})`}</Option>)
                    }
                  </Select>
                </Form.Item>
              </>
              )
            : (
              <>
                <Form.Item label='表单:' name='formId' key='formId' rules={[{ required: !disabled, message: '表单不能为空' }]}>
                  <Select
                    style={{ width: '50%' }}
                    showSearch
                    disabled={disabled}
                    filterOption={(inputValue: string, option: any) => {
                      console.log('option', option)
                      return String(option.children).includes(inputValue)
                    }}
                    placeholder='请选择模型'>
                    {
                      forms.map(({ value, text }: any) => <Option key={value} value={value}>{`${text ?? value}(${value})`}</Option>)
                    }
                  </Select>
                </Form.Item>
                <Form.Item dependencies={['pageType']} key='formType' name='formType' label='操作类型:' rules={[{ required: !disabled, message: '操作类型不能为空' }]}>
                  <Select
                    style={{ width: '50%' }} disabled={disabled}>
                    {
                      operateTypeConfig.map(item => <Option value={item.value} key={item.key}>{item.name}</Option>)
                    }
                  </Select>
                </Form.Item>
              </>
              )
        }}
      </Form.Item>
    </div>
  )
}

export default SwitchListOrFormItems

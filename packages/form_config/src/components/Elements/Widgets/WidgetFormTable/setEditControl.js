import { forwardRef } from 'react';
import { Input } from 'antd';
import { getWidgetByFieldType, EnumRenderType } from '..';
import { refSelectFieldType } from '@utils/types';
import { InitialPageDataContext } from '@/context';

export default forwardRef(({
  onPressEnter,
  onBlur,
  dataIndex,
  editing,
  record,
  className,
  customConfig,
  value,
  onChange,
  ...rest
}, ref) => {
  const fieldType = customConfig?.targetFieldConfig?.fieldType;
  const isRefSelectFieldType = refSelectFieldType.includes(fieldType);
  const Widget = getWidgetByFieldType(
    fieldType,
    // 是关联下拉时，采用表单形式的组件（为了复用其中的部分hook）
    (isRefSelectFieldType || editing) ? EnumRenderType.form : EnumRenderType.list
  );
  if (Widget) {
    return (
      <InitialPageDataContext.Provider
        value={{
          isBatch: true,
          data: [record],
        }}
      >
        <Widget {...{
          editing,
          // 编辑的表单组件需要传递ref
          ...(editing
            ? {
                ref,
                value,
                onChange,
              }
            : {
                value: record[dataIndex],
                onChange,
              }
          ),
          className,
          field: dataIndex,
          onPressEnter,
          onBlur,
          // 自定义控件属性，直接传递给相应widget控件
          customWidgetProps: {
            // 关联下拉选，需要默认打开下拉选
            ...(isRefSelectFieldType && editing && {
              defaultOpen: true,
            }),
          },
        }}/>
      </InitialPageDataContext.Provider>
    );
  }
  return <Input ref={ref} onPressEnter={onPressEnter} onBlur={onBlur} {...rest} />;
});

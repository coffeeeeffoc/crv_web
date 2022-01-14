import { getWidgetByFieldType } from '../index';
import { forwardRef, useEffect } from 'react';
import { useBasicWidgetProps } from '@/hooks/business/useWidget';
import { FieldFormula, EnumFieldType, Field_HasProp_ShowType, Field_HasProp_ShowFormat } from '@utils/types';
import message from '@utils/browser/message';
import { ModelContext } from '@/context';
import { setDescendantProp } from '@utils/browser/utils';
import _ from 'lodash';

export default forwardRef((props: any, ref) => {
  const { fieldConfig } = useBasicWidgetProps<FieldFormula>(props);
  const {
    resultType,
  } = fieldConfig;
  const showTypePropName = Field_HasProp_ShowType.includes(resultType)
    ? 'showFormat'
    : Field_HasProp_ShowFormat.includes(resultType)
      ? 'showType'
      : '';
  const Comp = getWidgetByFieldType(resultType);

  useEffect(() => {
    if (resultType === EnumFieldType.FORMULA) {
      message.error('公式类型字段的结果类型不允许为公式类型');
    }
  }, [resultType]);
  if (!Comp || resultType === EnumFieldType.FORMULA) {
    return null;
  }
  // 设置新属性
  const newProps = _.cloneDeep(props);
  setDescendantProp(newProps, 'widgetDetail.props.disabled', true);
  // 此处使用ModelContext.Provider是为了代理，把改动范围限制在此处，而尽量不影响其他逻辑
  return (
    <ModelContext.Provider value={{
      model: {
        fields: [{
          ...fieldConfig,
          fieldType: resultType,
          ...(showTypePropName && {
            showTypePropName: fieldConfig.showType,
          }),
        }],
      },
    } as any}>
      <Comp
        ref={ref}
        {...newProps}
        // 用来区分是否是公式字段，因为公式字段的结果类型需要某些属性而没设置改属性，处理的时候略有区别
        isFormulaFieldType={true}
      />
    </ModelContext.Provider>
  );
});

export const DisplayTableContent = () => {
  return null;
};

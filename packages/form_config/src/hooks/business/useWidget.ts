import { pickProps, removeUndefined } from '@utils/browser/utils';
import { useFieldConfig } from '@/hooks/business/useConfig';
import { useContext, useEffect, useState } from 'react';
import { EditTypeContext, ModelContext } from '@/context';
import { EnumEditType } from '@utils/types';
import message from '@utils/browser/message';
import { useDiffCallback } from '@rc/hooks/basic/usePrevious';

// 执行字段校验
const useValidateField = () => {
  return () => {};
};

type useBasicWidgetPropsType = <T = any>(args: any) => {
  fieldConfig: T;
  props: any;
  modelId: string;
  field: string;
  onPressEnter?: (e: any) => void;
  onBlur?: (e: any) => void;
};

export const useBasicWidgetProps: useBasicWidgetPropsType = ({
  value,
  style,
  field,
  onPressEnter,
  onBlur: onBlurProps,
  widgetDetail,
  // 自定义的属性，需要直接传递给控件的
  customWidgetProps,
}) => {
  const { modelId } = useContext(ModelContext);
  const editType = useContext(EditTypeContext);
  // removeUndefined删除动态值中undefined的值，以提供【虽然设置了函数，但也允许在某种条件下跟没设置一样】的功能
  const {
    visible,
    ...restProps
  }: any = pickProps(removeUndefined(widgetDetail?.props), 'style disabled visible'.split(' '));
  const fieldConfig: any = useFieldConfig(field);

  // 判断是否超过存储长度
  useEffect(() => {
    const { length, name, id } = fieldConfig || {};
    const valLength = String(value ?? '').length;
    if (length && valLength > length) {
      message.warning(`字段：[${id}:${name}]长度(${valLength})超出存储长度(${length})`);
    }
  }, [value, fieldConfig]);
  // 校验
  const validate = useValidateField();
  const onBlur = (e: any) => {
    onBlurProps?.(e);
    // 失去焦点时，进行校验
    validate?.();
  };

  return {
    fieldConfig,
    modelId,
    field,
    props: {
      id: `${modelId}.${field}`,
      // 详情时，默认禁用，但可根据配置覆盖默认
      ...(editType === EnumEditType.detail && {
        disabled: true,
      }),
      placeholder: fieldConfig?.name,
      ...restProps,
      // 阻止主从表编辑状态下选择内容变为拖拽
      onClick: (e: React.MouseEvent) => {
        console.log('preventDefault--1');
        e.preventDefault();
      },
      onPressEnter,
      onBlur,
      ...customWidgetProps,
      style: {
        width: '100%',
        ...style,
        ...restProps?.style,
        ...customWidgetProps?.style,
      },
    },
  };
};

type VoidFunc = () => void;
type DeliveryDefaultValueType<Y> = (val: Y) => void;
type ConstructDeliveryType<Y = any> = (val: Y, cb1: DeliveryDefaultValueType<Y>) => DeliveryDefaultValueType<Y> | VoidFunc;
type useDefaultValueType<Y = any> = (
  constructDefaultValue: () => Y,
  deliveryDefaultValue: DeliveryDefaultValueType<Y>,
  constructDelivery?: ConstructDeliveryType<Y>
) => Y;

// 默认的constructDelivery
const defaultConstructDelivery: ConstructDeliveryType = (val, cb) => val ? cb : () => {};

/**
 * 处理如何生成默认值，以及把默认值传递出去
 * @param constructDefaultValue 构造默认值的函数
 * @param deliveryDefaultValue 把默认值传递出去的函数
 * @param constructDelivery 对deliveryDefaultValue进行处理并生成新的deliveryDefaultValue
 */
export const useDefaultValue: useDefaultValueType = (
  constructDefaultValue,
  deliveryDefaultValue,
  constructDelivery = defaultConstructDelivery
) => {
  const [newDefaultValue] = useState(constructDefaultValue);
  useDiffCallback(newDefaultValue, constructDelivery(newDefaultValue, deliveryDefaultValue));
  return newDefaultValue;
};

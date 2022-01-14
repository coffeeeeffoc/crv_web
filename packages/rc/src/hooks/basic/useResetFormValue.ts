import { useEffect, useRef } from 'react';
import { FormInstance } from 'antd';
// import { stableValueHash } from '@crv/utils/src/browser/stableValue';

/**
 * 当值的内容发生变化时，把值设置到表单中
 * @param value 值
 * @param form 表单实例
 */
export const useResetFormValue = (value: any, form: FormInstance) => {
  const prevValueRef = useRef(value);
  useEffect(() => {
    prevValueRef.current = value;
  });
  useEffect(() => {
    // if (
    //   prevValueRef.current !== undefined
    //     && value !== undefined
    //     && stableValueHash(prevValueRef.current) !== stableValueHash(value)
    // ) {
    //   form.setFieldsValue(value);
    // }
    form.setFieldsValue(value);
  }, [value, form]);
};

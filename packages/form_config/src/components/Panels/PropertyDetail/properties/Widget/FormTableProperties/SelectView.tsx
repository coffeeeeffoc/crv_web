import SelectView from '@@/SelectView';
import { RefField } from '@/types';
import { useAdditionFieldConfig } from './hooks';
import { BasicFormTablePropertiesContext } from '.';
import {
  useContext,
  forwardRef,
} from 'react';

export default forwardRef<any, any>((props, ref) => {
  const fieldConfig = useAdditionFieldConfig();
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const modelId = (fieldConfig as RefField)?.refModel ?? 'test_luoju';
  const { setPartialConfigState } = useContext(BasicFormTablePropertiesContext);
  return modelId
    ? (
        <SelectView {...{
          ref,
          modelId,
          selectProps: {
            ...props,
            // 选择某个视图后，更新到FormTableProperties组件的configState状态中
            onChange: (viewId: any) => {
              props?.onChange?.(viewId);
              setPartialConfigState?.({ viewId });
            },
          },
        }} />
      )
    : null;
});

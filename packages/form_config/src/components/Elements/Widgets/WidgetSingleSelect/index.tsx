import classNames from 'classnames';
import { useBasicWidgetProps } from '@/hooks/business/useWidget';
import RefSelect from '@rc/RefWidget/RefSelect';
import { forwardRef, useContext } from 'react';
import { DisplayTypeContext, ModelContext, InitialPageDataContext } from '@/context';

export const RefCommonWrapper = forwardRef<any, any>((props, ref) => {
  const {
    className,
    value,
    onChange,
    editing,
  } = props;
  const { modelId, field, fieldConfig, props: basicWidgetProps } = useBasicWidgetProps(props);
  const { editType } = useContext(ModelContext);
  const displayType = useContext(DisplayTypeContext);
  // TODO:isBatch批量操作的时候暂不处理，后续再处理
  const { data: initialPageData } = useContext(InitialPageDataContext);
  const querySelfDataContext = {
    displayType,
    editType,
    initialPageData,
  };
  return (
    <RefSelect {...{
      editing,
      value,
      onChange,
      modelId,
      field,
      querySelfDataContext,
      config: fieldConfig,
      transformProps: prop => ({
        ref,
        ...prop,
        ...basicWidgetProps,
        ...(fieldConfig?.length && { maxLength: fieldConfig.length }),
        // defaultValue: fieldConfig.defaultValue,
        // value,
        // onChange,
        className: classNames(className),
        style: {
          ...basicWidgetProps.style,
        },
      }),
    }} />
  );
});

export default forwardRef((props: any, ref) => <RefCommonWrapper ref={ref} {...props} />);

// 转换内容
export const convertContent = ({ value }: any) => {
  const displayValue = value;
  const displayContent = String(displayValue ?? '');
  return displayContent;
};

// 展示表格内容
export const DisplayTableContent = (props: any) => {
  const displayContent = convertContent(props);
  return (
    <span title={displayContent} >{displayContent}</span>
  );
};

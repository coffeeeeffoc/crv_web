import { forwardRef } from 'react';
import { RefCommonWrapper } from '../WidgetSingleSelect';

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

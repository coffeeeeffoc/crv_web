import { Button } from 'antd';
import { pickProps } from '@utils/browser/utils';
import classNames from 'classnames';

export default ({
  style,
  className,
  widgetProps,
}: any) => {
  // TODO:按钮的名字，事件等（）不过既然操作在其他界面设置，则此处可能不需要按钮控件
  // disabled根据实际情况传参
  const {
    visible,
    ...restProps
  }: any = pickProps(widgetProps, 'style disabled visible'.split(' '));
  return (
    <Button
      {...restProps}
      className={classNames(className)}
      style={{
        ...style,
        ...restProps?.style,
      }}
    >button</Button>
  );
};

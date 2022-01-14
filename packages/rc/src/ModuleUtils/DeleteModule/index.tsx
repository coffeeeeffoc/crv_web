import { Popconfirm } from 'antd';
/**
 * 封装删除弹窗的组件
 */
interface propsType {
  children: any;
  [propsName:string]: any;
}

export default ({
  children,
  ...rest
}:propsType) => {
  return (
    <Popconfirm
      placement="top"
      cancelText="取消"
      okText="确定"
      title="是否确认删除？"
      {...rest}
    >
      {children}
    </Popconfirm>
  )
}
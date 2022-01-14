import { FC, useState } from 'react'
import { Resizable } from 'react-resizable'
import { deBounce } from '@/utils/utilConvert'
import classnames from 'classnames'

const ResizableTitle: FC<any> = (props) => {
  const { onResize, width, ...restProps } = props;

  // 添加偏移量
  const [offset, setOffset] = useState<number>(0)

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={Number(width) + Number(offset)}
      height={0}
      handle={
        <span
          // 有偏移量显示竖线
          // className={'react-resizable-handle' + (offset === 0 ? '' : 'active')}
          className={classnames(['react-resizable-handle', offset && 'active'])}
          // 拖拽层偏移
          style={{ transform: `translateX(${offset}px)` }}
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
          }}
        />
      }
      // 拖拽事件实时更新
      onResize={(e, { size }) => {
        // 这里只更新偏移量，数据列表其实并没有伸缩
        deBounce(setOffset(size.width - width), 50)
      }}
      // 拖拽结束更新
      onResizeStop={(...argu) => {
        // 拖拽结束以后偏移量归零
        setOffset(0)
        // 这里是props传进来的事件，在外部是列数据中的onHeaderCell方法提供的事件，请自行研究官方提供的案例
        onResize(...argu)
      }}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      {/* <th {...restProps} /> */}
      <th {...restProps} style={{
        overflow: 'visible',
        // zIndex: 999,
        ...restProps.style,
      }} >
        <div style={{
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}>{restProps.children}</div>
      </th>
    </Resizable>
  )
}

export default ResizableTitle

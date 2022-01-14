import { useDrop } from 'react-dnd';

export default ({
  accepts,
  onDrop,
  children,
  ...restProps
}: any) => {
  const [, drop] = useDrop(() => ({
    accept: accepts,
    // drop: onDrop,
    drop: (item, monitor) => {
      // 如果已经放置，则不再执行放置动作
      if (monitor.didDrop()) {
        return;
      }
      onDrop(item, monitor);
    },
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  }));
  // 若子元素不存在，或者有多个，无法直接绑定ref，所以在外面添加一个容器元素来接收ref
  if (!children || Array.isArray(children)) {
    return (
      <span ref={drop} >
        {children}
      </span>
    );
  }

  return (
    <children.type {...children.props} ref={drop} />
  );
};

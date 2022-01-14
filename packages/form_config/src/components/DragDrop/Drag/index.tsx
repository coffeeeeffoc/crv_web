import {
  useDrag,
  DragPreviewImage,
} from 'react-dnd';
// import { convertComp2Img } from './comp2img';

export default ({
  type,
  children,
  preview,
  data,
  title,
  ...restProps
}: any) => {
  const previewOptions = {
    offsetX: 0,
    offsetY: 0,
  };
  /**
   * 针对previewOptions：
   * 本来useDrag也有一个参数previewOptions，但是不生效，所以在DragPreviewImage的connect的时机（其实是dragPreview的执行时机）传参即可
   * https://github.com/react-dnd/react-dnd/issues/2333
   */
  const [, drag, dragPreview] = useDrag(() => ({
    type,
    item: {
      type,
      ...data,
    },
  }));
  return (
    <>
      <DragPreviewImage src={preview} connect={ref => dragPreview(ref, previewOptions)} />
      <span ref={drag} title={title} >
        {children}
      </span>
    </>
  );
};

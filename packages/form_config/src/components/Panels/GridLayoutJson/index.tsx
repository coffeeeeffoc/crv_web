import ReactJsonView from 'react-json-view';
import { useAppSelector } from '@/redux/hooks';

export default () => {
  const canvasAreas = useAppSelector(state => state.canvas.areas);
  return (
    <div>
      <ReactJsonView src={canvasAreas} />
    </div>
  );
};

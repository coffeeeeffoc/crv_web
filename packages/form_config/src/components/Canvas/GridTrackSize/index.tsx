import { getGridArea } from '../GridTrack';
import classNames from 'classnames';
import styles from './index.less';
import TrackSize from '../TrackSize';
import { useAppSelector } from '@/redux';

export default ({
  area,
  pos,
  implicitGrid,
  type,
}: any) => {
  const gridArea: any = getGridArea({ pos, implicitGrid, type });
  const currentAreaId = useAppSelector(state => state.canvas.currentAreaId);
  const isCurrent = currentAreaId === area.id;
  return (
    <section
      style={{ gridArea }}
      className={classNames(styles.gridTrackSize, type)}
    >
      {isCurrent && <TrackSize
        {...{
          grid: area.grid,
          type,
          track: pos,
        }}
      />}
    </section>
  );
};

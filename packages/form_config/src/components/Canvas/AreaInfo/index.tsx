import AreaAdditions from '@@/Canvas/AreaAdditions';
import AreaButtons from '@@/Canvas/AreaButtons';
import {
  useAppSelector,
} from '@/redux/hooks';
import classNames from 'classnames';
import {
  getParentArea,
} from '@/utils/area';
import {
  areaDisplayColor,
  getAreaDepth,
} from '@/utils/store/area';
import {
  getGridRegion,
} from '@/utils/grid';
import styles from './index.less';
import { areaExchangeType, useAreaExchange } from './hooks/useAreaExchange';
import { useDelayClick } from './hooks/useDelayClick';
import { useDropControls } from '@@/Canvas/GridCell/hooks/useDropControls';

const AREA_INFO_CONTROL_TOP = 0;

export { areaExchangeType };

export default function AreaInfo ({
  area,
  areas,
  implicitGrid,
  dropActiveArea,
  currentHover,
  setMultiState,
  setArea,
  onEditArea,
}: any) {
  const isDropActive = area.id === dropActiveArea?.id;
  const currentAreaId = useAppSelector(state => state.canvas.currentAreaId);
  const isCurrent = currentAreaId === area.id;
  const currentFocus = useAppSelector(state => state.canvas.currentFocus);
  const isHighLighted = (
    (area.parent &&
      !currentFocus &&
      currentHover &&
      ((currentHover.on === 'cell' && currentHover.area && currentHover.area === area) ||
        (currentHover.on === 'html-area' && currentHover.area === area))) ||
    (currentFocus && currentFocus.on === 'area' && currentFocus.area === area)
  );
  const gridRegion = getGridRegion({
    ...area,
    parent: getParentArea(areas, area.parent),
  });
  const toolbarStart = gridRegion ? (gridRegion.col.start === 1 && gridRegion.row.start === 1 ? getAreaDepth(area, areas) - 1 : 0) : 0;
  const { ref, isDragging } = useAreaExchange({ area });
  const onClick = useDelayClick({
    cancelCondition: isDragging,
    delay: 100,
    execute: () => {
      setMultiState({
        currentAreaId: area.id,
      });
    },
  });
  console.log('areaInfo--toolbarStart', toolbarStart);
  const { drop } = useDropControls({
    ref,
    area,
    implicitGrid,
    setMultiState,
    setArea,
    explicitDropArea: area,
  });
  drop(ref);
  return (
    <div
      ref={ref}
      className={classNames(
        styles.areaInfo,
        { isDropActive },
      )}
      style={{
        pointerEvents: area.grid ? 'none' : 'all',
        border: `2px solid ${areaDisplayColor(area)}`,
        backgroundColor: isHighLighted ? areaDisplayColor(area).replace(', 0.8)', ', 0.07)') : area.grid ? '' : 'white',
        boxShadow: isCurrent ? 'inset 0 0px 10px #000000' : '',
        // backgroundColor: isHighLighted ? areaDisplayColor(area).replace(', 0.8)', ', 0.07)') : '',
        top: 0,
        left: 0,
      }}
      onMouseOver={() => {
        setMultiState({
          overArea: area,
          dropActiveArea: area,
        });
      }}
      onClick={onClick}
    >
      <AreaAdditions area={area} />
      <div
        className="area-info-controls"
        // style={{ top: `${toolbarStart * 34 + AREA_INFO_CONTROL_TOP}px` }}
        style={{ top: `${AREA_INFO_CONTROL_TOP}px` }}
      >
        <AreaButtons
          {...{
            area,
            setArea,
            onEditArea,
          }}
        />
      </div>
    </div>
  );
};

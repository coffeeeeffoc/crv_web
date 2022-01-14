/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { asValidGridArea } from '@/utils/grid';
import classNames from 'classnames';
import { useAppSelector } from '@/redux/hooks';
import styles from './index.less';
import { generateStringId } from '@utils/browser/generateId';
import { produce } from 'immer';
import {
  getRandomColor,
  createAreaState,
  selectionGridArea,
} from '@/utils/store/area';
import { useEffect } from 'react';
import {
  createSection,
} from '@/utils/area';
import { useDropControls } from './hooks/useDropControls';

export const createNewArea = ({
  id,
  implicitGrid,
  area,
}: any) => {
  const section = createSection({ col: +id.col, row: +id.row });
  const tempSelection = {
    start: section,
    end: section,
    color: getRandomColor(),
    fresh: true,
    implicitGrid: implicitGrid,
    parent: area,
  };
  const newArea = createAreaState({
    id: generateStringId(),
    gridArea: selectionGridArea(tempSelection),
    color: tempSelection.color,
    parent: area.id,
  });
  return newArea;
};

// 交换两个区域的内容
export const exchangeAreaAdditions = ({
  areaAdditions,
  sourceId,
  targetId,
}: any) => produce(areaAdditions, (draft: any) => {
  const toEmptyArea = draft[targetId] === undefined;
  if (toEmptyArea) {
    draft[targetId] = draft[sourceId];
    delete draft[sourceId];
  } else {
    const tmp = draft[targetId];
    draft[targetId] = draft[sourceId];
    draft[sourceId] = tmp;
  }
});

export default ({
  area,
  section,
  implicitGrid,
  grayed,
  focused,
  onPointerDown,
  onOverCell,
  setMultiState,
  setArea,
}: any) => {
  const dragging = useAppSelector(state => state.canvas.dragging);
  // const overArea = useAppSelector(state => state.canvas.overArea);
  const selection = useAppSelector(state => state.canvas.selectionArea);
  const gridArea = asValidGridArea(section.row.start, section.col.start, section.row.end, section.col.end, implicitGrid);
  const colsNumber = area.grid.col.sizes.length;
  const rowsNumber = area.grid.row.sizes.length;
  const visible = !(selection && selection.parent !== area && selection.fresh);
  const { drop, dropActive } = useDropControls({
    area,
    implicitGrid,
    setMultiState,
    setArea,
  });

  useEffect(() => {
    if (dropActive) {
      onOverCell({ col: section.col.start, row: section.row.start }, dropActive);
    }
  }, [dropActive, onOverCell, section.col.start, section.row.start]);

  return (
    <section
      style={{
        gridArea,
        background: grayed ? '#e8e8e8' : '#ffffff80',
        // ...selectionDraggingStyle
      }}
      className={classNames(
        styles.gridSection,
        {
          // lastcol: section.col.start === colsNumber && section.row.start === 1,
          // lastrow: section.row.start === rowsNumber && section.col.start === 1,
          implicit:
            section.row.start < 1 ||
            section.row.end > rowsNumber + 1 ||
            section.col.start < 1 ||
            section.col.end > colsNumber + 1,
          dragging,
          grayed,
          focused,
        }
      )}
    >
      {visible && <div
        ref={drop}
        data-col-start={section.col.start}
        data-row-start={section.row.start}
        data-col-end={section.col.end}
        data-row-end={section.row.end}
        onPointerDown={onPointerDown}
        onMouseOver={() => onOverCell({ col: section.col.start, row: section.row.start }, dropActive)}
      ></div>}
    </section>
  );
};

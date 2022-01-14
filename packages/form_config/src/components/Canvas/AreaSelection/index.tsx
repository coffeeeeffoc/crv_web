/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useImperativeHandle, forwardRef, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { canvasActions } from '@/redux/actions';
import { sectionFromEvent } from '@/utils/area';
// import { toCssName } from '@/utils/utils';
import { getRandomColor, createAreaState, selectionGridArea } from '@/utils/store/area';
import { Button } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './index.less';
import { generateStringId } from '@utils/browser/generateId';
import { findImplicitGrid, explicitGridAreaToGridRegion } from '@/utils/grid';

function farEnough (a: any, b: any, delta = 5) {
  return Math.abs(a.x - b.x) > delta || Math.abs(a.y - b.y) > delta;
}

const getConflictArea = (section: any, area: any) => {
  const explicitAreas = area.display === 'grid'
    ? findImplicitGrid(area)
    : { gridAreas: [], implicitGrid: {} };
  const gridRegions: any[] = explicitAreas.gridAreas.map(explicitGridAreaToGridRegion);
  const colSpan = section.end.col.start - section.start.col.start;
  const colStart = colSpan > 0 ? section.start.col.start : section.end.col.start;
  const rowSpan = section.end.row.start - section.start.row.start;
  const rowStart = rowSpan > 0 ? section.start.row.start : section.end.row.start;
  for (let i = 0; i <= Math.abs(colSpan); i++) {
    for (let j = 0; j <= Math.abs(rowSpan); j++) {
      const col = colStart + i;
      const row = rowStart + j;
      const matchIndex = gridRegions.findIndex(r => {
        return r.row.start <= row && r.row.end > row && r.col.start <= col && r.col.end > col;
      });
      if (matchIndex > -1) {
        return area.children[matchIndex];
      }
    }
  }
  return null;
};

export default forwardRef(({
  area,
  setArea,
  implicitGrid,
}: any, ref) => {
  const selection = useAppSelector(state => state.canvas.selectionArea) as any;
  const dispatch = useAppDispatch();
  const setMultiState = useCallback((payload: any) => dispatch(canvasActions.setMultiState(payload)), [dispatch]);
  const cellDown = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();

    const section = sectionFromEvent(event);
    if (section) {
      let newSelection = selection;
      const newSelectionTmp = {
        start: section,
        end: section,
        color: getRandomColor(),
        fresh: true,
        implicitGrid,
        parent: area,
      };
      if (newSelection && newSelection.parent?.id !== area.id) {
        newSelection = null;
      }

      if (!newSelection) {
        newSelection = newSelectionTmp;
      }
      let finalSelection = {
        ...newSelection,
        dragging: {
          initial: { x: event.clientX, y: event.clientY },
          section,
        },
      };
      // 若当前网格已经数据某个区域，则不处理
      const conflictArea = getConflictArea(finalSelection, area);
      if (conflictArea) {
        // 设置当前点击且冲突的区域为当前区域currentAreaId
        setMultiState({
          currentAreaId: conflictArea.id,
        });

        return;
      }
      // 当已有选择区域但还没创建，并且此时选择了一个已有区域时，选中该已有区域
      if (selection) {
        const conflictArea = getConflictArea(newSelectionTmp, area);
        if (conflictArea) {
          setMultiState({
            currentAreaId: conflictArea.id,
            selectionArea: null,
          });
          return;
        }
      }
      setMultiState({
        selectionArea: finalSelection,
        ...(!(finalSelection?.area) && { currentAreaId: area.id }),
      });
      const onPointerMove = (event: any) => {
        const sectionOver = sectionFromEvent(event);
        if (sectionOver) {
          const { dragging, fresh } = finalSelection;
          const temp: any = {};
          if (dragging) {
            if (fresh) {
              temp.end = sectionOver;
            } else {
              if (farEnough(dragging.initial, { x: event.clientX, y: event.clientY })) {
                temp.fresh = true;
                temp.start = section;
              }
            }
            temp.dragging = {
              ...dragging,
              section: sectionOver,
            };
            finalSelection = {
              ...finalSelection,
              ...temp,
            };
            // 若当前网格已经数据某个区域，则不处理
            if (getConflictArea(finalSelection, area)) {
              return;
            }
            setMultiState({
              selectionArea: finalSelection,
            });
          }
        }
      };

      const onPointerUp = () => {
        const temp: any = {
          fresh: false,
        };
        if (finalSelection.dragging) {
          temp.end = finalSelection.dragging.section;
          temp.dragging = null;
        }
        finalSelection = {
          ...finalSelection,
          ...temp,
        };
        // 若当前网格已经数据某个区域，则不处理
        if (getConflictArea(finalSelection, area)) {
          return;
        }
        setMultiState({
          selectionArea: finalSelection,
        });
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
      };
      window.addEventListener('pointermove', onPointerMove, false);
      window.addEventListener('pointerup', onPointerUp, false);
      return () => {
        window.removeEventListener('pointermove', onPointerMove, false);
        window.removeEventListener('pointerup', onPointerUp, false);
      };
    }
  }, [area, implicitGrid, selection, setMultiState]);
  useImperativeHandle(ref, () => ({
    cellDown,
  }), [cellDown]);
  const closeSelection = useCallback(() => {
    setMultiState({
      selectionArea: null,
    });
  }, [setMultiState]);
  const saveSelection = useCallback(() => {
    const newArea = createAreaState({
      id: generateStringId(),
      gridArea: selectionGridArea(selection),
      color: selection.color,
      parent: area.id,
    });
    setArea(newArea);
    setMultiState({
      selectionArea: null,
      overArea: newArea,
    });
  }, [area.id, selection, setArea, setMultiState]);
  const gridArea = selection ? selectionGridArea(selection) : 'initial';
  const visible = selection?.parent?.id === area?.id;
  const onKeyUp: React.KeyboardEventHandler<HTMLElement> = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeSelection();
    } else if (e.key === 'Enter') {
      saveSelection();
    }
  };
  return visible
    ? (
        <section
          className={styles.selectionWrapper}
          style={{
            gridArea,
            borderColor: selection?.color,
          }}
          onKeyUp={onKeyUp}
        >
          <div className='button-container'>
            <Button
              type='primary'
              title='设置为网格区域'
              onClick={saveSelection}
            ><SaveOutlined /></Button>
            <Button
              type='primary'
              title='取消选择'
              onClick={closeSelection}
            ><CloseOutlined /></Button>
          </div>
        </section>
      )
    : null;
});

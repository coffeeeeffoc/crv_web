/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import GridCell from '@@/Canvas/GridCell';
import GridTrack from '@@/Canvas/GridTrack';
import GridTrackSize from '@@/Canvas/GridTrackSize';
import AreaSelection from '@@/Canvas/AreaSelection';
import AreaInfo from '@@/Canvas/AreaInfo';
import {
  isActiveArea,
  isFocused,
  createSection,
  tracksFor,
  gridAreaStyles,
  getDisplayStyles,
} from '@/utils/area';
import {
  areaDisplayColor,
} from '@/utils/store/area';
import {
  findImplicitGrid,
  explicitGridAreaToGridRegion,
  parseValueUnit,
  parseValue,
} from '@/utils/grid';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { canvasActions } from '@/redux/actions';
import styles from './index.less';
import classNames from 'classnames';
import GridEditor from '../GridEditor';
import type { dropActiveAreaType } from '@/redux/slices/canvas';
import { AreaState } from '@/types/area';

const areaTypes = {
  div: 'div',
  section: 'section',
};

// 根据area以及某个子area来设置area的children
export const setAreaChildrenByArea = (area: AreaState, a: any) => {
  const childIndex = area.children.findIndex(({ id }: any) => id === a.id);
  const newChildren = area.children.slice();
  if (childIndex > -1) {
    if (Object.keys(a).length === 1) {
      newChildren.splice(childIndex, 1);
    } else {
      newChildren.splice(childIndex, 1, a);
    }
  } else {
    newChildren.push(a);
  }
  return newChildren;
};

const getAreaType = (type: any) => (areaTypes as any)[type] ?? 'section';

const AreaEditor = ({
  zIndex = 0,
  area,
  setArea,
  gridArea,
}: any) => {
  const dispatch = useAppDispatch();
  const areaRef = useRef(null);
  const areaSelectionRef = useRef<any>(null);
  const currentAreaId = useAppSelector(state => state.canvas.currentAreaId);
  const dragging = useAppSelector(state => state.canvas.dragging);
  const areas = useAppSelector(state => state.canvas.areas);
  const dropActiveArea = useAppSelector(state => state.canvas.dropActiveArea);
  const isMain = areas.id === area.id;
  const setMultiState = useCallback((payload: any) => dispatch(canvasActions.setMultiState(payload)), [dispatch]);
  const currentHover = useAppSelector(state => state.canvas.currentHover);
  const [computedGap, setComputedGap] = useState({ col: '0px', row: '0px' });
  const [computedStyles, setComputedStyles] = useState<any>(null);
  const explicitAreas = useMemo(() => {
    if (area.display === 'grid') {
      return findImplicitGrid(area);
    } else {
      return { gridAreas: [], implicitGrid: {} };
    }
  }, [area]);
  const implicitGrid = useMemo(() => explicitAreas.implicitGrid, [explicitAreas]);
  const gridCells = useMemo(() => {
    if (!area.grid) {
      return [];
    }
    const { cols, rows, ri, ci }: any = implicitGrid;
    const sections = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        sections.push(createSection({ col: c + ci, row: r + ri }));
      }
    }
    return sections;
  }, [area.grid, implicitGrid]);
  const gridRegions = useMemo(() => explicitAreas.gridAreas.map(explicitGridAreaToGridRegion), [explicitAreas]);
  const gridTracks = useMemo(() => {
    return [...tracksFor({
      type: 'row',
      area,
      implicitGrid,
    }), ...tracksFor({
      type: 'col',
      area,
      implicitGrid,
    })];
  }, [area, implicitGrid]);
  const AreaType = getAreaType(area.type);
  const isActive = useMemo(() => isActiveArea(area, currentAreaId), [area, currentAreaId]);
  const onEditArea = useCallback((a) => {
    setArea({
      ...area,
      children: setAreaChildrenByArea(area, a),
    });
  }, [setArea, area]);
  const areasToShow: any[] = area.children;
  useEffect(() => {
    let styles, gap;
    const gridValue = area.grid;
    if (gridValue) {
      styles = window.getComputedStyle(areaRef.current as any);
      const colGap = parseValueUnit(gridValue.col.gap);
      const rowGap = parseValueUnit(gridValue.row.gap);
      gap = {
        col:
          colGap.unit === '%'
            ? (parseValue(styles.width) / 100) * colGap.value + 'px'
            : styles.columnGap,
        row:
          rowGap.unit === '%'
            ? (parseValue(styles.height) / 100) * rowGap.value + 'px'
            : styles.rowGap,
      };
    } else {
      styles = null;
      gap = { col: '0px', row: '0px' };
    }
    setComputedStyles(styles);
    setComputedGap(gap);
  }, [area.grid]);
  const onPointerDown = useCallback((e) => {
    areaSelectionRef.current.cellDown(e);
  }, []);
  const onOverCell = useCallback(({ row, col }, dropActive) => {
    const { children } = area;
    // let dropActiveArea = null;
    for (let i = children.length - 1; i >= 0; i--) {
      const r = gridRegions[i];
      if (r.row.start <= row && r.row.end > row && r.col.start <= col && r.col.end > col) {
        setMultiState({
          overArea: children[i],
          dropActiveArea: dropActive ? children[i] : null as dropActiveAreaType,
        });
        return;
      }
    }
    setMultiState({
      overArea: area,
      dropActiveArea: dropActive
        ? {
            parent: area.id,
            id: {
              row,
              col,
            },
          }
        : null as dropActiveAreaType,
    });
  }, [area, gridRegions, setMultiState]);
  return (
    <AreaType
      ref={areaRef}
      className={classNames(
        styles.areaEditor,
        {
          grayed: !isActive,
          dragging,
        }
      )}
      onMouseLeave={() => setMultiState({
        overArea: null,
      })}
      data-area-id={area.id}
      style={{
        display: area.display,
        border: area.display === 'grid' && !isMain && `2px solid ${areaDisplayColor(area)}`,
        ...gridAreaStyles(area, gridArea, areas),
        ...getDisplayStyles(area),
        ...(area.width === 'auto' && { minWidth: area.parent ? 'max(24px,50%)' : '100%' }),
        ...(area.height === 'auto' && { minHeight: area.parent ? 'max(24px,50%)' : '100%' }),
        zIndex,
      }}
    >
      {gridCells.map((section, index) => (
        <GridCell key={`section-${index}`} {...{
          area,
          section,
          implicitGrid,
          grayed: !isActive,
          focused: isFocused(section, currentHover, area.grid),
          onPointerDown,
          onOverCell,
          dropActiveArea,
          setMultiState,
          setArea: onEditArea,
        }} />
      ))}
      {gridTracks.map((track, index) => (
        <GridTrack key={`track-${track.type}-${track.pos}`} {...{
          area,
          type: track.type,
          pos: track.pos,
          implicitGrid,
        }} />
      ))}
      <GridEditor
        {...{
          area,
          computedGap,
          computedStyles,
          implicitGrid,
          grayed: !isActive,
          onOverCell,
        }}
      />
      {gridTracks.map((track, index) => (
        <GridTrackSize key={`track-size-${track.type}-${track.pos}`} {...{
          area,
          type: track.type,
          pos: track.pos,
          implicitGrid,
        }} />
      ))}
      {areasToShow.map((a, index) => (
        <AreaEditor key={`area-${a.id}`} {...{
          zIndex: ('cols' in implicitGrid) && ((gridRegions[index].row.start - 1) * implicitGrid.cols + gridRegions[index].col.start),
          area: a,
          gridArea: explicitAreas.gridAreas[index],
          setArea: onEditArea,
        }} />
      ))}
      {!isMain && <AreaInfo {...{
        area,
        areas,
        implicitGrid,
        dropActiveArea,
        currentHover,
        setMultiState,
        setArea,
        onEditArea,
      }} />}
      <AreaSelection
        ref={areaSelectionRef}
        {...{
          area,
          implicitGrid,
          setArea: onEditArea,
        }}
      />
    </AreaType>
  );
};

AreaEditor.displayName = 'AreaEditor';

export default AreaEditor;

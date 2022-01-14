/* eslint-disable @typescript-eslint/restrict-plus-operands */
import classNames from 'classnames';
import { asValidGridArea, parseValue } from '@/utils/grid';
import { useAppSelector } from '@/redux';
import styles from './index.less';

export const getGridArea = ({ pos, implicitGrid, type }: any): any => {
  return type === 'row'
    ? asValidGridArea(pos, implicitGrid.ci, pos + 1, implicitGrid.cols + implicitGrid.ci, implicitGrid)
    : asValidGridArea(implicitGrid.ri, pos, implicitGrid.rows + implicitGrid.ri, pos + 1, implicitGrid);
};

export default ({
  type,
  pos,
  area,
  implicitGrid,
}: any) => {
  // TODO: 暂不清楚什么作用
  const currentFocus = useAppSelector(state => state.canvas.currentFocus);
  // TODO: 暂不清楚什么作用
  const currentHover = useAppSelector(state => state.canvas.currentHover);
  // TODO: 暂不清楚什么作用
  const dragging = useAppSelector(state => state.canvas.dragging);
  const grid = area.grid;

  const isDraggingGrid = dragging && dragging.grid === grid;

  function isHover (pos: any) {
    const f = currentHover;
    return (
      !currentFocus && f && f.on === 'track' && f.grid === grid && f.type === type && f.track === pos
    );
  }
  const isTrackHover = isHover(pos);
  const isNextTrackHover = isHover(pos + 1);

  function isFocused (pos: any) {
    const f = currentFocus;
    return f && f.on === 'track' && f.grid === grid && f.type === type && f.track === pos;
  }

  const isTrackFocused = isFocused(pos);
  const isNextTrackFocused = isFocused(pos + 1);

  function isLineFocused (pos: any) {
    const f = currentFocus;
    return f && f.on === 'line' && f.grid === grid && f.type === type && f.pos === pos;
  }

  const isLineDraggingPrev = isDraggingGrid && dragging[type + 'Line'] === pos;
  const isLineFocusedPrev = isLineFocused(pos);
  const isLineDraggingNext = isDraggingGrid && dragging[type + 'Line'] === pos + 1;
  const isLineFocusedNext = isLineFocused(pos + 1);

  const isExplicitPrev = pos >= 1 && pos <= grid[type].lineNames.length;
  const isExplicitNext = pos + 1 >= 1 && pos + 1 <= grid[type].lineNames.length;

  const gridArea: any = getGridArea({ pos, implicitGrid, type });

  return (
    <section
      data-col={type === 'col' ? pos : undefined}
      data-row={type === 'row' ? pos : undefined}
      style={{ gridArea }}
      className={classNames(
        styles.section,
        type,
        {
          darkmode: false,
          compact: area.padding === '0',
          'row-first': type === 'row' && pos === 1,
          'col-first': type === 'col' && pos === 1,
          'row-last': type === 'row' && pos === grid.row.sizes.length,
          'col-last': type === 'col' && pos === grid.col.sizes.length,
          'row-no-gap': type === 'row' && parseValue(grid.row.gap) === 0,
          'col-no-gap': type === 'col' && parseValue(grid.col.gap) === 0,
          'is-explicit-prev': isExplicitPrev,
          'is-explicit-next': isExplicitNext,
          'dragging-prev': isLineDraggingPrev,
          'dragging-next': isLineDraggingNext,
          'focused-prev': isLineFocusedPrev,
          'focused-next': isLineFocusedNext,
          focused: isTrackFocused || isTrackHover,
          'focused-track-next': isNextTrackFocused || isNextTrackHover,
          'remove-action': isTrackHover && currentHover.action === 'remove',
          // There is a bug that prevents extending the grid lines with the current
          // implementation if there aren't at least 2 explicit tracks
          extend: grid.col.sizes.length > 1 && grid.row.sizes.length > 1,
        }
      )}
    />
  );
};

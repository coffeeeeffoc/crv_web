/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useAppSelector, useAppDispatch } from '@/redux';
import { canvasActions } from '@/redux/actions';
import classNames from 'classnames';
import styles from './index.less';
import { useRef, useCallback } from 'react';

export default ({
  grid,
  setGrid,
  track,
  type,
}: any) => {
  const ref = useRef<any>(null);
  const dragging: any = useAppSelector(state => state.canvas.dragging);
  const dispatch = useAppDispatch();
  const currentFocus: any = useAppSelector(state => state.canvas.currentFocus);
  const layoutConfigSetting: any = useAppSelector(state => state.layoutConfigSetting);
  const isDraggingGrid = dragging && dragging.grid === grid;
  const isDraggingTrackLine = isDraggingGrid && (track === dragging[type + 'Line'] || track === dragging[type + 'Line'] - 1);
  const isFocused = currentFocus && currentFocus.on === 'track' && currentFocus.grid === grid && currentFocus.type === type && currentFocus.track === track;
  const trackSize = grid[type].sizes[track - 1];
  const setCurrentFocus = (value: any) => dispatch(canvasActions.set({
    key: 'currentFocus',
    value,
  }));
  const onInput = useCallback((event) => {
    event.stopPropagation();
    const { code } = event;
    if (code === 'Space') {
      event.preventDefault();
      return;
    }
    if (code === 'Enter' || code === 'NumpadEnter' || code === 'Escape') {
      event.preventDefault();
      ref.current.blur();
    }
    grid[type].sizes[track - 1] = event.target.childNodes[0]?.data;
    setGrid(grid);
  }, [grid, setGrid, track, type]);
  const gridTrackSizeVisible = layoutConfigSetting.canvas.gridTrackSize.visible;
  const gridTrackSizeEditable = layoutConfigSetting.canvas.gridTrackSize.editable;
  return gridTrackSizeVisible
    ? (
    <div
      ref={ref}
      contentEditable={gridTrackSizeEditable}
      aria-label={`${type} track ${track} size`}
      className={classNames(
        styles.editorTrackSize,
        type,
        {
          active: isDraggingTrackLine,
          focused: isFocused,
        }
      )}
      onPointerDown={e => e.stopPropagation()}
      onKeyDown={onInput}
      onFocus={() => setCurrentFocus({ on: 'track', grid, type, track })}
      onBlur={() => setCurrentFocus(null)}
      dangerouslySetInnerHTML={{
        __html: trackSize,
      }}
    />
      )
    : null;
};

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { canvasActions } from '@/redux/actions';
import { useCallback } from 'react';
import { batch } from 'react-redux';
import { createGridState } from '@/utils/store/grid';
import { getParentArea, replaceTheArea } from '@/utils/area';
import styles from './index.less';
import { CloseOutlined, TableOutlined, DeleteOutlined, ClearOutlined } from '@ant-design/icons';
import { produce } from 'immer';

export default ({
  area,
  setArea,
}: any) => {
  const dispatch = useAppDispatch();
  const currentAreaId = useAppSelector(state => state.canvas.currentAreaId);
  const areas = useAppSelector(state => state.canvas.areas);
  const overArea = useAppSelector(state => state.canvas.overArea);
  const areaAdditions = useAppSelector(state => state.canvas.areaAdditions);
  const currentAddition = areaAdditions[area.id];
  const visible = overArea?.id === area.id || currentAreaId === area.id;

  const onAddSubGrid = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
    batch(() => {
      dispatch(canvasActions.setMultiState({
        selectionArea: null,
        currentAreaId: area.id,
      }));
      dispatch(canvasActions.removeAreaAdditionById(area.id));
    });
    setArea({
      ...area,
      children: [],
      type: 'div',
      display: 'grid',
      grid: createGridState(),
    });
  }, [area, dispatch, setArea]);
  const onRemoveArea = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
    const parentArea = getParentArea(areas, area.parent);
    const parentAreaChildren = parentArea.children;
    const index = parentAreaChildren.findIndex(({ id }: any) => id === area.id);
    const newAreas = replaceTheArea(areas, {
      ...parentArea,
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      children: [...parentAreaChildren.slice(0, index), ...parentAreaChildren.slice(index + 1)],
    });
    dispatch(canvasActions.setMultiState({
      currentAreaId: newAreas.id,
      areaAdditions: produce(areaAdditions, (draft: any) => {
        delete draft[area.id];
      }),
      areas: newAreas,
    }));
  }, [area.id, area.parent, areas, dispatch, areaAdditions]);
  const onClearArea = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setArea({
      ...area,
      children: [],
      display: 'block',
      grid: null,
    });
  };
  const onClearControls = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    dispatch(canvasActions.removeAreaAdditionById(area.id));
  };
  const hasDisplay = area.grid;
  const hasDropped = !!currentAddition;
  return visible
    ? (
    <div className={styles.buttonContainer} >
      {!hasDisplay && !hasDropped && <button className='btn-subgrid' title='创建子网格' onClick={onAddSubGrid}><TableOutlined /></button>}
      {hasDropped && <button title='清除控件' onClick={onClearControls}><ClearOutlined /></button>}
      <button className='btn-remove' title='删除区域' onClick={onRemoveArea}><DeleteOutlined /></button>
      {hasDisplay && <button className='btn-remove btn-clear' title='清除子网格' onClick={onClearArea}><CloseOutlined /></button>}
    </div>
      )
    : null;
};

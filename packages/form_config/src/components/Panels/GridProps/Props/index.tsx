import Groups from './Groups';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { canvasActions } from '@/redux/actions';
import { useCallback } from 'react';
import { replaceTheArea, getAreaById } from '@/utils/area';
import { setAreaValues, getAreaValues } from './config/propsMapCanvas';

export default () => {
  const dispatch = useAppDispatch();
  const currentAreaId = useAppSelector(state => state.canvas.currentAreaId);
  const areas = useAppSelector(state => state.canvas.areas);
  const currentArea = getAreaById(areas, currentAreaId);
  const isGridNull = !currentArea?.grid;
  const fieldsValue: any = getAreaValues(currentArea);
  const setFieldsValue = useCallback((obj: any) => {
    const newCurrentArea = setAreaValues(currentArea, obj);
    dispatch(canvasActions.setMultiState({
      areas: replaceTheArea(areas, newCurrentArea),
      currentAreaId: newCurrentArea.id,
    }));
  }, [areas, currentArea, dispatch]);
  const area = currentArea ?? areas;
  return (
    <Groups
      key={area.id}
      isGridNull={isGridNull}
      fieldsValue={fieldsValue}
      setFieldsValue={setFieldsValue}
    />
  );
};

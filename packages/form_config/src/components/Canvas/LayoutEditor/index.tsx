import AreaEditor from '../AreaEditor';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { canvasActions } from '@/redux/actions';
import { useListenKeydown } from '@rc/hooks/basic/useEventListener';
import { useMemo, useCallback } from 'react';
import { getParentArea, replaceTheArea, getAreaById } from '@/utils/area';
import { ViewContainer } from '@@/View';
import { EnumDisplayType } from '@/types';

export default () => {
  const areas = useAppSelector(state => state.canvas.areas);
  const currentAreaId = useAppSelector(state => state.canvas.currentAreaId);
  const dispatch = useAppDispatch();
  const onRemoveArea = useCallback(() => {
    if (currentAreaId) {
      const currentArea = getAreaById(areas, currentAreaId);
      const parentArea = getParentArea(areas, currentArea.parent);
      const parentAreaChildren = parentArea.children;
      const index = parentAreaChildren.findIndex(({ id }: any) => id === currentAreaId);
      const newAreas = replaceTheArea(areas, {
        ...parentArea,
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        children: [...parentAreaChildren.slice(0, index), ...parentAreaChildren.slice(index + 1)],
      });
      dispatch(canvasActions.setMultiState({
        currentAreaId: newAreas.id,
        areas: newAreas,
      }));
    }
  }, [currentAreaId, areas, dispatch]);
  const keyMap = useMemo(() => ({
    delete: onRemoveArea,
  }), [onRemoveArea]);
  // useListenKeydown(keyMap, areaEditorRef.current);
  useListenKeydown(keyMap, () => document.querySelector('.container>section'));
  const setAreas = (value: any) => dispatch(canvasActions.setMultiState({
    areas: value,
  }));
  return (
    <ViewContainer displayType={EnumDisplayType.config} >
      <AreaEditor
        area={areas}
        setArea={setAreas}
      />
    </ViewContainer>
  );
};

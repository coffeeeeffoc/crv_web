import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { canvasActions } from '@/redux/actions';

const selectedStyle = {
  boxShadow: 'rgb(0 0 0) 0px 0px 10px inset',
};

export const useSelectButton = ({
  id,
}: any) => {
  const dispatch = useAppDispatch();
  const currentOperationId = useAppSelector(state => state.canvas.currentOperationId);
  const onSelect = () => {
    dispatch(canvasActions.setMultiState({
      currentOperationId: id,
      currentAreaId: null,
    }));
  };
  console.log('currentOperationId', id, currentOperationId);
  const isSelected = id === currentOperationId;
  return {
    isSelected,
    selectedStyle: isSelected && selectedStyle,
    onSelect,
  };
};

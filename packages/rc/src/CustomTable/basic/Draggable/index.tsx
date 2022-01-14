import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export * from './DraggableBodyRow';
export * from './DraggableHeaderCell';

export const DraggableWrapper = ({
  children
}: any) => {
  return (
    <DndProvider backend={HTML5Backend}>
      {children}
    </DndProvider>
  );
};

import { CustomTableBasicConfig } from '../types';
import { composeConfigHooks, antdTableDefaultComponents } from '../compose';
import { useDraggableBodyRow, useDraggableHeaderCell } from '../Draggable';
import { useEditable } from '../Editable';
import { useResizableHeaderCell } from '../ResizableHeaderCell';
import { useState } from 'react';

export const useExtension = (config: CustomTableBasicConfig, props: any) => {
  const { rowSelection, ...restProps } = props;
  // 此处useState缓存一个默认实例，为了保证components中的相关组件的引用保持稳定，不会无限刷新
  const [defaultComponents] = useState(() => JSON.parse(JSON.stringify(antdTableDefaultComponents)));
  const newProps = composeConfigHooks(
    defaultComponents,
    config.showCheckbox ? props : restProps,
    [config.editable, useEditable],
    [config.rowDraggable, useDraggableBodyRow],
    [config.headerColDraggable, useDraggableHeaderCell],
    [config.headerColResizable, useResizableHeaderCell],
  );
  return newProps;
};

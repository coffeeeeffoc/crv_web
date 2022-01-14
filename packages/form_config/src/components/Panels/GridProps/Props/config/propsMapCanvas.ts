import { AreaState } from '@/types';
import { setValueByPath, pickProps } from '@utils/browser/utils';
import type { defaultFieldsValueType } from '@/redux/slices/gridProps';

// key与在area中对应的属性位置关系
export const fieldPositionMaps = {
  explicitType: 'grid.explicitType',
  childrenCount: 'grid.implicit.childrenCount',
  rowCount: 'grid.implicit.rowCount',
  columnCount: 'grid.implicit.columnCount',
  rowHeight: 'grid.implicit.rowHeight',
  columnWidth: 'grid.implicit.columnWidth',
  rowGap: 'grid.row.gap',
  columnGap: 'grid.col.gap',
  justifyContent: 'grid.justifyContent',
  alignContent: 'grid.alignContent',
  justifyItems: 'grid.justifyItems',
  alignItems: 'grid.alignItems',
  justifySelf: 'justifySelf',
  alignSelf: 'alignSelf',
  autoFlow: 'grid.autoFlow',
};

// 根据上面位置对应关系，取值
export const getAreaValues = (area: AreaState): defaultFieldsValueType => pickProps(area, fieldPositionMaps);

// 根据上面位置对应关系，设置值
export const setAreaValues = (area: AreaState, values: any) =>
  Object.keys(values)
    .reduce(
      (res, key) =>
        setValueByPath<AreaState>({
          target: res,
          field: key,
          value: values[key],
          maps: fieldPositionMaps,
        }),
      area
    );

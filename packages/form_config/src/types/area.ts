export type UnitSelectType = 'default' | 'grid' | 'flex' | 'size';

export type DefaultUnit = 'px' | '%' | 'em';

export type GridUnit = DefaultUnit | 'fr' | 'auto' | 'min-content' | 'max-content' | 'minmax';

export type Initial = 'initial';

export type GlobalProperties = Initial | 'inherit' | 'unset';

export type BasicProperties = 'center' | 'start' | 'end' | 'stretch' | Initial;

export type ContentProperties = BasicProperties | 'space-around' | 'space-between' | 'space-evenly';

export type AutoFlowProperties = 'column' | 'row' | 'column dense' | 'row dense';

export type Cell = 'col' | 'row';

export type AreaType = 'width' | 'height';

export type AlignOptionsType = 'content' | 'items' | 'self';
export interface LineName {
  active: boolean;
  name: string;
};

export interface UnitsInterface {
  flex: DefaultUnit[];
  grid: GridUnit[];
  default: DefaultUnit[];
  size: GridUnit[];
  auto: GridUnit[];
};

export interface GridDimension {
  sizes: string[];
  auto?: any;
  lineNames: LineName[];
  gap: string;
};

export type GridState = null | {
  explicitType: 'explicit' | 'implicit';
  implicit: {
    childrenCount: number;
    rowCount: number;
    columnCount: number;
    rowHeight: string;
    columnWidth: string;
  };
  row: GridDimension;
  col: GridDimension;
  autoFlow: AutoFlowProperties;
  justifyContent: ContentProperties;
  alignContent: ContentProperties;
  justifyItems: BasicProperties;
  alignItems: BasicProperties;
};

export interface ValueUnit {
  value: string | number;
  unit: GridUnit;
};

export interface ValueGapUnit extends Omit<ValueUnit, 'unit'> {
  unit: DefaultUnit;
};

export interface AreaState {
  id: string;
  name?: string;
  color: string;
  type: string;
  display: 'block' | 'grid';
  grid: GridState;
  gridArea: string;
  justifySelf: string;
  alignSelf: string;
  width: string;
  height: string;
  // flexGrow: string;
  // flexShrink: string;
  // flexBasis: string;
  children: AreaState[];
  parent: any;
  // flex: any;
  margin?: any;
  padding?: any;
  // text: any;
  // items: any;
};

export type SelectionAreaType = null | {
  start: {
    row: {
      start: number;
      end: number;
    };
    col: {
      start: number;
      end: number;
    };
  };
  end: {
    row: number;
    col: number;
  };
  name: string;
  color: string;
  fresh: boolean;
  implicitGrid: any;
  parent: any;
};

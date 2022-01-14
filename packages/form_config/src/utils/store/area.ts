/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { generateStringId } from '@utils/browser/generateId';
import type { LineName } from '@/types';
import { parseGridTemplate } from './grid';
import { asValidGridArea } from '../grid';

// AREA COLORS
const colors = [
  'rgba(0, 0, 0, 0.8)',
  // 'rgba(245, 130, 48, 0.8)',
  // 'rgba(230, 25, 75, 0.8)',
  // 'rgba(156, 39, 176, 0.8)',
  // 'rgba(63, 81, 181, 0.8)',
  // 'rgba(0, 128, 128, 0.8)',
  // 'rgba(60, 180, 75, 0.8)',
];

const remainingColors: string[] = [];

export function getRandomColor () {
  if (remainingColors.length === 0) {
    remainingColors.push(...colors);
  }
  return remainingColors.splice(randomIndex(remainingColors), 1)[0];
};

function randomIndex (array: any[]) {
  return Math.floor(Math.random() * array.length);
};

export function rewireChildren (area: any) {
  if (!area.children) {
    area.children = [];
  }
  area.children.forEach(rewireChildren);
  return area;
};

export function rewireParent (area: any, parent = null) {
  area.parent = parent;
  area.children.forEach((child: any) => rewireParent(child, area));
  return area;
};

function parseAutoSizes (s: string) {
  return s ? s.split(/\s/) : [];
};

export function lineNamesToState (names: string[]): LineName[] {
  return names.map((name) => {
    return { active: name !== '', name };
  });
};

export function parseArea (json: any) {
  const newJson = JSON.parse(json, (key, value) => {
    if (key === 'grid' && value) {
      const { gap, templateColumns, templateRows, autoColumns, autoRows, ...gridData } = value;
      const [colSizes, colLineNames] = templateColumns ? parseGridTemplate(templateColumns) : [[], ['']];
      const [rowSizes, rowLineNames] = templateRows ? parseGridTemplate(templateRows) : [[], ['']];
      const colAutoSizes = autoColumns ? parseAutoSizes(autoColumns) : [];
      const rowAutoSizes = autoRows ? parseAutoSizes(autoRows) : [];
      const gridGap = value.gap.split(' ');
      const grid = {
        row: { sizes: rowSizes, lineNames: lineNamesToState(rowLineNames), gap: gridGap[0], auto: rowAutoSizes },
        col: { sizes: colSizes, lineNames: lineNamesToState(colLineNames), gap: gridGap[1], auto: colAutoSizes },
        ...gridData,
      };
      return grid;
    }
    if (key === 'children' || key === 'areas') {
      // In v1, area.children was in area.grid.areas
      return value.map(createAreaState);
    }
    return value;
  });
  const area = {
    justifySelf: 'center',
    alignSelf: 'center',
    width: 'auto',
    height: 'auto',
    ...newJson,
  };
  return rewireParent(createAreaState(rewireChildren(area)));
}
export function createAreaState ({
  // name = 'area',
  color = colors[0],
  type = 'div',
  display = 'block',
  grid = null,
  // flex = null,
  gridArea = 'auto',
  width = 'auto',
  height = 'auto',
  // margin = '0',
  // padding = '0',
  justifySelf = 'initial',
  alignSelf = 'initial',
  // flexGrow = 0,
  // flexShrink = 1,
  // flexBasis = '100%',
  // text = '',
  // items = null,
  children = [],
  parent = null,
  id = generateStringId(),
}: any) {
  return {
    // name, // name字段不再使用，id即可表示唯一
    color,
    type,
    display,
    grid,
    // flex,
    gridArea,
    width,
    height,
    // margin,
    // padding,
    justifySelf,
    alignSelf,
    // flexGrow,
    // flexShrink,
    // flexBasis,
    // text,
    // items,
    children,
    id,
    parent,
  };
};

function selectionDimension (type: any, start: any, end: any) {
  return {
    start: Math.min(start[type].start, end[type].start),
    end: Math.max(start[type].end, end[type].end),
  };
}

function selectionArea (selection: any) {
  const { start, end } = selection;
  return {
    row: selectionDimension('row', start, end),
    col: selectionDimension('col', start, end),
  };
}

export function selectionGridArea (selection: any) {
  const gr = selectionArea(selection);
  return asValidGridArea(gr.row.start, gr.col.start, gr.row.end, gr.col.end, selection.implicitGrid);
}

export function areaDisplayColor (area: any) {
  return area.gridArea === 'auto' ? area.color : area.color;
}

export function getAreaDepth (area: any, areas: any): any {
  if (area.id === areas.id) {
    return 0;
  }
  const children = areas.children;
  for (let i = 0; i < children.length; i++) {
    const depth = getAreaDepth(area, children[i]);
    if (depth !== undefined) {
      return depth + 1;
    }
  }
  // const parent = area.parent;
  // if (parent) {
  //   return getAreaDepth(parent) + 1;
  // } else {
  //   return 0;
  // }
};

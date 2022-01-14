import { GridDimension, GridState, LineName } from '@/types';

export function lineNamesToState (names: string[]): LineName[] {
  return names.map((name) => {
    return { active: name !== '', name };
  });
};

function newLineNames (n: number): LineName[] {
  return lineNamesToState(new Array(n).fill(''));
};

function parseLineName (item: string): string | undefined {
  return item.includes('[') ? item.match(/\[(.*)\]/)?.[1].trim() : undefined;
};

export function parseGridTemplate (templateStr: string) {
  // splits at and space that isn't between two [ ] brackets
  const parsedArr = templateStr.split(/\s(?![^[]*])/);
  const lineNames: string[] = [];
  const templateArr: string[] = [];
  let position = 0;
  parsedArr.forEach((item) => {
    const lineName = parseLineName(item);
    if (lineName) {
      while (lineNames.length < position) {
        lineNames.push('');
      }
      lineNames.push(lineName);
    } else {
      templateArr.push(item);
      ++position;
    }
  });
  while (lineNames.length <= templateArr.length) {
    lineNames.push('');
  }

  return [templateArr, lineNames];
};

export function createGridDimension (n: number, unit = '1fr', gap = '0px'): GridDimension {
  return {
    sizes: new Array(n).fill(unit),
    auto: [],
    lineNames: newLineNames(n + 1),
    gap,
  };
};

export const DEFAULT_ROW_UNIT = 'minmax(65px, min-content)';

export function createGridState ({
  explicitType = 'explicit',
  implicit = {
    childrenCount: 9,
    rowCount: 3,
    columnCount: 3,
    rowHeight: '65px',
    columnWidth: '1fr',
  },
  row = createGridDimension(5, DEFAULT_ROW_UNIT, '8px'),
  col = createGridDimension(4, undefined, '32px'),
  autoFlow = 'row',
  justifyContent = 'initial',
  alignContent = 'initial',
  justifyItems = 'initial',
  alignItems = 'initial',
} = {}): GridState {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    explicitType,
    implicit,
    row,
    col,
    autoFlow,
    justifyContent,
    alignContent,
    justifyItems,
    alignItems,
  } as GridState;
};

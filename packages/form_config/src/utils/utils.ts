/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { getGridRegion, gridAreaToGridLimits } from './grid.js';
import { AreaState, GridState } from '@/types';

export const unitMeasureMap = {
  px: 300,
  fr: 1,
  em: 4,
  '%': 50,
  minmax: '20px, 60px',
  auto: '',
  'min-content': '',
  'max-content': '',
  initial: '',
};

export function getElementTag (area: AreaState) {
  switch (area.type) {
    case 'p':
      return 'p';
    case 'image': // TODO: Should we keep it as div in the code?
      return 'img';
    default:
      return 'div';
    // TODO: Should we add a comment if component is used?
  }
}

export function areaIsSingleLineInCSS (area: AreaState) {
  return (
    area.display !== 'grid' &&
    area.justifySelf === 'initial' &&
    area.alignSelf === 'initial' &&
    area.margin === '0' &&
    area.padding === '0' &&
    area.width === 'auto' &&
    area.height === 'auto'
  );
}

export function includeAreaInCSS (area: AreaState) {
  return !(areaIsSingleLineInCSS(area) && area.gridArea === 'auto');
}

export function namedTemplateRows (grid: GridState, repeat: boolean) {
  if (!grid) {
    return '';
  }
  return generateNamedTemplate(grid.row.sizes, grid.row.lineNames, true, repeat);
}

export function namedTemplateColumns (grid: GridState, repeat: boolean) {
  if (!grid) {
    return '';
  }
  return generateNamedTemplate(grid.col.sizes, grid.col.lineNames, true, repeat);
}

function repeatify (tokens: any) {
  for (;;) {
    const longestSequence = findRepeatingSequence(tokens);
    if (!longestSequence) {
      break;
    }
    tokens.splice(
      longestSequence.start,
      longestSequence.tokens.length * longestSequence.times,
      `repeat(${longestSequence.times}, ${longestSequence.tokens.join(' ')})`
    );
  }
  return tokens.join(' ');
}
function matchSequence (tokens: any, start: any, size: any): any {
  if (start + 2 * size > tokens.length) {
    return 0;
  }
  for (let pos = 0, j = start, k = start + size; pos < size; pos++, j++, k++) {
    if (tokens[j] !== tokens[k]) {
      return 0;
    }
  }
  return 1 + matchSequence(tokens, start + size, size);
}
function findRepeatingSequence (tokens: any) {
  let data;
  let longest = 0;

  for (let start = 0; start < tokens.length - 1 - longest * 2; start++) {
    for (let size = 1; start + 2 * size <= tokens.length; size++) {
      const count = matchSequence(tokens, start, size);
      const times = count + 1;
      if (count > 0 && times * size > longest) {
        data = { start, times, size };
        longest = times * size;
      }
    }
  }
  return (
    data && {
      ...data,
      tokens: tokens.slice(data.start, data.start + data.size),
    }
  );
}
export function generateNamedTemplate (templateArr: any, lineNames: any, css = true, repeat = false): any {
  let str = '';
  for (let i = 0; i < lineNames.length; i++) {
    const { active, name } = lineNames[i];
    if (active && name) {
      str += `[${css ? toCssName(name) : name}] `;
    }
    if (i < templateArr.length) {
      if (repeat) {
        str += repeatify(templateArr.slice(' '));
        break;
      } else {
        str += templateArr[i] + ' ';
      }
    }
  }
  return str.trim();
}

export function createSection ({ col, row }: any) {
  return {
    col: { start: col, end: col + 1 },
    row: { start: row, end: row + 1 },
  };
}

export function gridTemplateAreasMatrix ({ grid, children }: any) {
  const colsNumber = grid.col.sizes.length;
  const rowsNumber = grid.row.sizes.length;

  const chunkAreas: any[] = [];
  for (let i = 0; i < rowsNumber; i++) {
    chunkAreas[i] = Array(colsNumber).fill(null);
  }

  let validTemplate = true;

  children.forEach((area: any) => {
    const gridRegion = getGridRegion(area);
    if (gridRegion) {
      const { row, col } = gridRegion;
      if (row.start < 1 || row.end > rowsNumber + 1 || col.start < 1 || col.end > colsNumber + 1) {
        validTemplate = false;
      } else {
        for (let r = row.start; r < row.end; ++r) {
          for (let c = col.start; c < col.end; ++c) {
            if (chunkAreas[r - 1][c - 1]) {
              validTemplate = false;
            }
            chunkAreas[r - 1][c - 1] = area;
          }
        }
      }
    }
  });

  return validTemplate ? chunkAreas : undefined;
}

export function templateAreasCellName (area: AreaState) {
  return area ? toCssName(area.id) : '.';
}

function matrixToTemplateAreas (matrix: any, separator: any) {
  return matrix.reduce((prev: string, item: any) => prev + `"${item.map(templateAreasCellName).join(' ')}"${separator}`, '').trim();
}

export function gridTemplateAreas (area: AreaState, separator = ' ') {
  const matrix = gridTemplateAreasMatrix(area);
  return matrix && matrixToTemplateAreas(matrix, separator);
}

export function gridRegionToGridArea (gridRegion: any) {
  // TODO:
  const { row, col } = gridRegion;
  return `${row.start} / ${col.start} / ${row.end} / ${col.end}`;
}

function namedRegionSide (gridRegion: any, parentGrid: any, type: any, side: any) {
  let result = gridRegion[type][side];
  if (parentGrid && result > 0 && result <= parentGrid[type].lineNames.length) {
    const lineNameState = parentGrid[type].lineNames[result - 1];
    if (lineNameState.active) {
      const name = lineNameState.name;
      if (name) {
        result = toCssName(name);
      }
    }
  }
  return result;
}

function isSimpleExplicit ({ start, end }: any) {
  return start.limit > 0 && end.limit > 0 && !(start.limit === end.limit);
}

// TODO: we are not using line names in complex cases (negative indexes, span, etc)
// It could be surprising for the user not to see the same numbers as in the grid-area input
// in the sidebar, but there may be cases where we could still show the line names
export function getGridAreaWithNamedLines (area: AreaState) {
  const parentGrid = area.parent.grid;
  const limits = gridAreaToGridLimits(area.gridArea);
  if (!limits.valid || limits.auto || !isSimpleExplicit(limits.row) || !isSimpleExplicit(limits.col)) {
    return area.gridArea;
  }
  const gridRegion = getGridRegion(area, limits);
  if (gridRegion) {
    const rowStart = namedRegionSide(gridRegion, parentGrid, 'row', 'start');
    const colStart = namedRegionSide(gridRegion, parentGrid, 'col', 'start');
    const rowEnd = namedRegionSide(gridRegion, parentGrid, 'row', 'end');
    const colEnd = namedRegionSide(gridRegion, parentGrid, 'col', 'end');
    return `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`;
  }
}

export function getCodeGridArea (area: AreaState, useTemplateAreas: any) {
  const gridRegion = getGridRegion(area);
  if (!gridRegion) {
    // Auto placed areas
    return area.gridArea;
  }
  const { parent } = area;
  if (parent) {
    return useTemplateAreas && getCodeGridTemplateAreas(parent) ? toCssName(area.id) : getGridAreaWithNamedLines(area);
  } else {
    return getGridAreaWithNamedLines(area);
  }
}

export function getCodeGridTemplateAreas (area: AreaState) {
  return area.display === 'grid' && area.grid?.col.sizes.length && area.grid.row.sizes.length
    ? gridTemplateAreas(area, '\n    ')
    : undefined;
}

export function toCssName (name: string) {
  return CSS.escape(name.replace(/\s/g, '-'));
}

export function onCodeInputKeydown (event: any, emit: any) {
  if (event.code === 'Space') {
    event.preventDefault();
    return;
  }
  if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Escape') {
    event.preventDefault();
    emit('move', { action: 'right' });
    return;
  }
  if (event.code === 'ArrowRight') {
    if (getCaretCharacterOffsetWithin(event.target) === targetText(event).length) {
      emit('move', { action: 'right' });
      return;
    }
  }
  if (event.code === 'ArrowLeft') {
    if (getCaretCharacterOffsetWithin(event.target) === 0) {
      emit('move', { action: 'left' });
    }
  }
}

export function targetText (event: any) {
  const textNode = event.target.childNodes[0];
  return textNode?.data;
}

function getCaretCharacterOffsetWithin (element: any) {
  let caretOffset = 0;
  const doc = element.ownerDocument || element.document;
  const win = doc.defaultView || doc.parentWindow;
  let sel;
  if (typeof win.getSelection !== 'undefined') {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      const range = win.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
  } else if ((sel = doc.selection) && sel.type !== 'Control') {
    const textRange = sel.createRange();
    const preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint('EndToEnd', textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
}

function farEnough (a: any, b: any, delta = 5) {
  return Math.abs(a.x - b.x) > delta || Math.abs(a.y - b.y) > delta;
}

export function handlePointerEventsInteraction (event: any, { onmove, onup, onclick }: any) {
  const initialPos = { x: event.clientX, y: event.clientY };
  const initialTime = new Date().getTime();

  let movingAnimation: any = null;
  const animatedMove = () => {
    if (movingAnimation && !movingAnimation.done) {
      // update state
      onmove(movingAnimation.event);

      movingAnimation.done = true;
    }
    if (movingAnimation) {
      requestAnimationFrame(animatedMove);
    } else {
      onup();
    }
  };

  const handleMove = (event: any) => {
    if (
      !movingAnimation &&
      new Date().getTime() - initialTime < 500 &&
      !farEnough(initialPos, { x: event.clientX, y: event.clientY })
    ) {
      return;
    }
    const startAnimation = !movingAnimation;
    movingAnimation = { done: false, event };
    if (startAnimation) {
      animatedMove();
    }
  };

  const handleUp = () => {
    if (!movingAnimation && new Date().getTime() - initialTime < 500) {
      onclick();
    }
    movingAnimation = null;

    window.removeEventListener('pointermove', handleMove);
    window.removeEventListener('pointerup', handleUp);
  };
  window.addEventListener('pointermove', handleMove);
  window.addEventListener('pointerup', handleUp);
}

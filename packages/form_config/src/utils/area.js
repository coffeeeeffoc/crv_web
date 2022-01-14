import { getRandomColor } from '@/utils/store/area';
import { parseUnit } from '@/utils/grid';

export function createSection ({ col, row }) {
  return {
    col: { start: col, end: col + 1 },
    row: { start: row, end: row + 1 },
  };
};

export function sectionFromEvent (event) {
  const el = document.elementFromPoint(event.clientX, event.clientY);
  if (el) {
    const { colStart, rowStart } = el.dataset;
    if (colStart !== undefined && rowStart !== undefined) {
      return createSection({ col: +colStart, row: +rowStart });
    }
  }
  return undefined;
};

export const createSelection = (event, props) => {
  const section = sectionFromEvent(event);
  return {
    start: section,
    end: section,
    color: getRandomColor(),
    name: '',
    fresh: true,
    implicitGrid: props.implicitGrid,
    parent: props.area,
  };
};

export function isActiveArea (area, currentAreaId) {
  return !!currentAreaId && (
    area.id === currentAreaId ||
    area.children.some((c) => c.children.length === 0 && c.id === currentAreaId) ||
    (area.parent ? area.parent === currentAreaId : false)
  );
};

// 判断是否需要高亮显示当前区域
export function isFocused (section, currentHover, grid) {
  const c = currentHover;
  return c && c.on === 'cell' && c.grid === grid && c.row === section.row.start && c.col === section.col.start;
};

export function linesFor ({
  type,
  implicitGrid,
}) {
  const lines = [];
  const { rows, cols, ri, ci } = implicitGrid;
  const size = type === 'row' ? rows : cols;
  const cellI = type === 'row' ? ri : ci;
  for (let i = cellI; i <= size + cellI; i++) {
    lines.push({ type, pos: i });
  }
  return lines;
}
export function tracksFor ({
  type,
  area,
  implicitGrid,
}) {
  const { grid } = area;
  const { rows, cols, ri, ci } = implicitGrid;
  const size = type === 'row' ? rows : cols;
  const cellI = type === 'row' ? ri : ci;
  const tracks = [];
  if (grid) {
    for (let i = cellI; i < size + cellI; i++) {
      tracks.push({
        type,
        pos: i,
      });
    }
  }
  return tracks;
};

export function isValidAreaName (newName, area) {
  if (!area) {
    return false;
  }
  const { name, grid } = area;
  return newName && name !== newName && !(grid && !area.children.every((a) => isValidAreaName(newName, a)));
};

export const getParentArea = (areas, parent) => {
  if (!parent || !areas || areas.id === parent) {
    return areas;
  }
  for (let i = 0; i < areas.children.length; i++) {
    const child = areas.children[i];
    const res = getParentArea(child, parent);
    if (res) {
      return res;
    }
  }
};
export const replaceTheArea = (areas, area) => {
  if (areas.id === area.id) {
    return area;
  }
  return {
    ...areas,
    children: areas.children.map(a => replaceTheArea(a, area)),
  };
};

function computedJustifyItem (area, areas) {
  const { parent, justifySelf } = area;
  const parentArea = getParentArea(areas, parent);
  return justifySelf !== 'initial' ? justifySelf : parentArea.grid ? parentArea.grid.justifyItems : 'initial';
};

function computedAlignItem (area, areas) {
  const { alignSelf, parent } = area;
  const parentArea = getParentArea(areas, parent);
  return alignSelf !== 'initial' ? alignSelf : parentArea.grid ? parentArea.grid.alignItems : 'initial';
};

export const style2ReactStyle = style => {
  switch (typeof style) {
    case 'object':
      return Object.keys(style).reduce((res, key) => {
        const newKey = key.replace(/-[a-z]/g, s => s.replace('-', '').toUpperCase());
        res[newKey] = style[key];
        return res;
      }, {});
    case 'string':
      break;
  }
};
export function gridAreaStyles (area, gridArea, areas) {
  const result = {
    'grid-area': gridArea || area.gridArea,
    'justify-self': computedJustifyItem(area, areas),
    'align-self': computedAlignItem(area, areas),
    'flex-grow': area.flexGrow,
    'flex-shrink': area.flexShrink,
    'flex-basis': area.flexBasis,
    margin: area.margin,
    padding: area.padding,
    width: area.with !== 'auto' && area.width,
    height: area.height !== 'auto' && area.height,
  };
  return style2ReactStyle(result);
};

function gridSizesForView (grid, type) {
  return grid[type].sizes
    .map((size) => {
      const unit = parseUnit(size);
      switch (unit) {
        case 'auto':
          return '200px';
        case 'min-content':
          return '100px';
        case 'max-content':
          return '300px';
        default:
          return size;
      }
    })
    .join(' ');
}

function gridStyles (grid) {
  return {
    display: 'grid',
    gridTemplateRows: gridSizesForView(grid, 'row'),
    gridTemplateColumns: gridSizesForView(grid, 'col'),
    gridAutoRows: grid.row.auto.join(' '),
    gridAutoColumns: grid.col.auto.join(' '),
    gridGap: `${grid.row.gap} ${grid.col.gap}`,
    justifyContent: grid.justifyContent,
    alignContent: grid.alignContent,
    // justifyItems and alignItems are always initial to avoid afecting
    // the helper elements in the grid, grid.justifyItems and grid.alignItems
    // are used in the areas for justifySelf and alignSelf
    // we could also use justifySelf, alignSelf in each helper
  };
}

function flexStyles (flex) {
  return {
    display: 'flex',
    'flex-direction': flex.direction,
    'flex-wrap': flex.wrap,
  };
}

export const getDisplayStyles = (area) => {
  switch (area.display) {
    case 'grid':
      return area.grid ? gridStyles(area.grid) : {};
    case 'flex':
      return area.flex ? flexStyles(area.flex) : {};
    default:
      return {};
  }
};

// 对area根据id按层级递归查找
export const getAreaById = (area, id) => {
  if (area.id === id) {
    return area;
  }
  for (let i = 0; i < area.children.length; i++) {
    const child = area.children[i];
    const res = getAreaById(child, id);
    if (res) {
      return res;
    }
  }
  return null;
};

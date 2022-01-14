
export const validGridUnits = ['fr', 'px', 'vw', 'vh', '%', 'em', 'auto', 'min-content', 'max-content', 'minmax'];

export const minMaxUnits = ['fr', 'px', 'vw', 'vh', '%', 'em', 'auto', 'min-content', 'max-content'];

export const units: any = {
  grid: validGridUnits,
  flex: ['px', '%', 'em'],
  default: ['px', '%', 'em'],
  size: ['px', '%', 'em', 'auto'],
  auto: [...validGridUnits, 'initial'],
};

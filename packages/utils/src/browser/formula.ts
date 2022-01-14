import { tryEval } from './utils';

export type FormulaExpression = string | {
  type: 'expression';
  formula: string;
};

export interface FormulaFunction {
  type: 'function';
  formula: string;
};

export type Formula = FormulaExpression | FormulaFunction;

export const execFormulaExpression = (formula: string, ...rest: any[]) => {
// TODO:此处解析"${a.b.c} + 1"等表达式，详细规则待定
};
export const execFormulaFunction = (formula: string, ...rest: any[]) => {
  return tryEval(`(${formula})`, () => null)(...rest);
};

export const execFormula = (formula: Formula, ...rest: any[]) => {
  if (typeof formula === 'string') {
    return execFormulaExpression(formula, ...rest);
  }
  if (formula.type === 'expression') {
    return execFormulaExpression(formula.formula, ...rest);
  }
  if (formula.type === 'function') {
    return execFormulaFunction(formula.formula, ...rest);
  }
};

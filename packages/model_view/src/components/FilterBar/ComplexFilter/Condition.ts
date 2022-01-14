export enum WordArrType {
  AND = 'and',
  OR = 'or',
  NOT = 'not',
  ANDNOT = 'andnot',
  ORNOT = 'ornot'
}

// 条件组合逻辑允许出现的相连字母
export const wordArrContext: string[] = [WordArrType.AND, WordArrType.ANDNOT, WordArrType.NOT, WordArrType.OR, WordArrType.ORNOT]

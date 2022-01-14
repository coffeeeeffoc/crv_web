import { Action } from './ActionType';

// 操作目标数据
export enum EnumTargetData {
  ONLY_ONE = 'ONLY_ONE',
  NO_SEL_DATA = 'NO_SEL_DATA',
  MULTIPLE = 'MULTIPLE',
};

// 操作的类型
export interface Operation {
  id: number;
  name: string;
  statement?: string;
  targetData: EnumTargetData;
  operationSteps: Action[];
};

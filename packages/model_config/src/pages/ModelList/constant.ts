
export enum updateDBKey {
  ZERO = 0,
  ONE = 1,
  TWO = 2
}
export const updateDBStatusType: any = {
  [updateDBKey.ZERO]: '未操作',
  [updateDBKey.ONE]: '更新成功',
  [updateDBKey.TWO]: '更新失败'
}

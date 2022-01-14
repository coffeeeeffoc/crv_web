import { getTextWidth } from '@crv/utils/src/browser/string';

const LR_PADDING = 10; // 单元格的左右padding
export const GAP = 5; // 按钮的间距gap
const COMBO_DROPDOWN_ICON_WIDTH = 13; // 操作组的右侧小图标的宽度

const operationLocale: any = {
  rowAdd: '新增',
  rowDelete: '删除',
};

export const getOperationWidth = (operations: any[], gap: number) => {
  const actionAllWidth = operations.reduce((sum: number, item) => {
    const width: number = getTextWidth(item);
    return sum + width;
  }, 0);
  return actionAllWidth + gap * Math.max(0, operations.length - 1);
};

interface OptionsType {
  // 操作之间的gap间距
  gap?: number;
  // 左右gap
  lrPadding?: number;
};
// 获取基本操作和配置操作的宽度
export const getOperationColWidth = (operations: any[], basicOperations: string[], comboContent: string = '', options?: OptionsType) => {
  const { lrPadding, gap} = {
    lrPadding: LR_PADDING,
    gap: GAP,
    ...options,
  };
  let comboCount = comboContent ? 1 : 0;
  console.log('getOperationColWidth', operations, basicOperations, comboContent);
  return lrPadding + getOperationWidth(
    operations.map(({ type, name, operationIds }) => {
      if (type === 'COMBO') {
        comboCount++;
        return name;
      } else if (type === 'SINGLE') {
        const { displayName, name } = operationIds?.[0] ?? {};
        return displayName ?? name ?? '';
      }
      return '';
    })
      .concat(basicOperations.filter(Boolean).map(k => operationLocale[k] ?? ''))
      .concat([comboContent]),
    gap
  ) + comboCount * COMBO_DROPDOWN_ICON_WIDTH;
};

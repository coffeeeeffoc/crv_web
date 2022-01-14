import { getType } from './utils';

/**
 * 本文件主要用于处理数字
 * 暂不考虑逗号分隔的数字，后续可能会考虑
 * 不考虑bigint、科学计数法等
 */

// 判断是否是携带%符号的数字
export const isPercentageStr = (val: string) => /^\d+(\.\d+)?%$/.test(val);
// 判断是否字符串数字
export const isNumberStr = (val: string) => /^\d+(\.\d+)?$/.test(val);

// 判断是否有效数字（不是NAN的Number）
export const isNumber = (val: any) => getType(val) === 'Number' && !Number.isNaN(val);

// 将数字转换为百分符号的字符串格式
export const toPercentage = (val: number | string) => {
  if (typeof val === 'number') {
    return `${val * 100}%`;
  } else if (isPercentageStr(val)) {
    return val;
  } else if (isNumberStr(val)) {
    return `${parseFloat(val) * 100}%`;
  }
  console.error('转换百分号失败');
  return '';
};

export const toFixedNumber = (num: number, point: number) => {
  const per = point;
  let result;
  if (isNaN(num)) {
    return null;
  }
  point = Math.pow(10, point);
  num *= point;
  if (num === +num) {
    if (num >= 0) result = parseInt(String(num + 0.5)) / point;
    if (num < 0) result = parseInt(String(num - 0.5)) / point;
  } else {
    result = +num;
  }
  return formatNumber(result as number, per);
};

export const formatNumber = (value: number, num: number) => {
  let a; let i;
  a = value.toString();
  const b = a.indexOf('.');
  const c = a.length;
  if (num === 0) {
    if (b !== -1) {
      a = a.substring(0, b);
    }
  } else if (b === -1) {
    a += '.';
    for (i = 1; i <= num; i++) {
      a += '0';
    }
  } else {
    a = a.substring(0, b + num + 1);
    for (i = c; i <= b + num; i++) {
      a += '0';
    }
  }
  return a;
};

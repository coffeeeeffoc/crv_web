import { CurrencyShowType } from '@/constants/constant';
import { currencyTransform } from '@/utils/utilConvert';
import moment from 'moment';

/**
 * 文本渲染
 * @param val
 * @param record
 * @param config
 * @returns
 */
export const textRender = (val: any, record: any, config: any) => {
  return val;
}
/**
 * 整型渲染
 * @param val
 * @param record
 * @param config
 * @returns
 */
export const intRender = (val: any, record: any, config: any) => {
  // 千分符
  if (config?.showType === CurrencyShowType.NORMAL) {
    return val;
  }
  // return `${val}`.replace(/(\d)(?=(\d{3})+(?:$|\.))/g, '$1,');
  return `${val}`.replace(/(\d)(?=(\d{3})+(?:$))/g, '$1,');
  // return currencyTransform(val, 0, config?.showType ?? CurrencyShowType.NORMAL);
}
/**
 * 货币
 * @param val
 * @param record
 * @param config
 * @returns
 */
export const currencyRender = (val: any, record: any, config: any) => {
  const { showDigits, showType } = config;
  if (val === undefined || val === null) return val;
  return currencyTransform(val, showDigits, showType);
}
/**
 * 小数
 * @param val
 * @param record
 * @param config
 * @returns
 */
export const decimalRender = (val: any, record: any, config: any) => {
  const { showDigits, showType } = config;
  if (val === undefined || val === null) return '';
  if (typeof val !== 'number') return val;
  return currencyTransform(val, showDigits, showType);
}
/**
 * 百分比
 * @param val
 * @param record
 * @param config
 * @returns
 */
export const percentageRender = (val: any, record: any, config: any) => {
  const { showDigits, showType } = config;
  if (val === undefined || val === null) return '';
  if (typeof val !== 'number') return val;
  return `${currencyTransform(val * 100, showDigits, showType)}%`;
}
/**
 * 千分比
 * @param val
 * @param record
 * @param config
 * @returns
 */
export const permillageRender = (val: any, record: any, config: any) => {
  const { showDigits, showType } = config;
  if (val === undefined || val === null) return '';
  if (typeof val !== 'number') return val;
  return `${currencyTransform(val * 1000, showDigits, showType)}‰`;
}

/**
 * 日期时间
 * @param val
 * @param record
 * @param config
 * @returns
 */
export const dateTimeRender = (val: any, record: any, config: any) => {
  if (!val) return val;
  // const defaultFormat = DateTimeShowTypeValue[config?.showFormat] ?? DateTimeShowTypeValue[DateTimeShowType.HYPHEN_NON_PREFIX_DEFAULT]
  return moment(val).format(config?.showFormat ?? 'YYYY-MM-DD HH:mm:ss')
}
/**
 * 日期
 * @param val 2021-01-01
 * @param record
 * @param config
 * @returns
 */
export const dateRender = (val: any, record: any, config: any) => {
  if (!val) return val;
  const { showFormat } = config;
  // const format = DateShowTypeValue[showFormat] ?? DateShowTypeValue[DateShowType.HYPHEN_PREFIX]
  return moment(val).format(showFormat ?? 'YYYY-MM-DD')
}
/**
 * 时间 √
 * @param val hh:mm:ss
 * @param record
 * @param config
 * @returns
 */
export const timeRender = (val: any, record: any, config: any) => {
  if (!val) return val;
  // const defaultFormat = TimeShowTypeValue[config?.showFormat] ?? TimeShowTypeValue[TimeShowType.DEFAULT]
  return moment(`1970-01-01 ${val}`).format(config?.showFormat ?? 'HH:mm:ss')
}
/**
 * 年
 * @param val 2021
 * @param record
 * @param config
 * @returns
 */
export const yearRender = (val: any, record: any, config: any) => {
  if (!val) return val;
  // const defaultFormat = YearShowTypeValue[config?.showFormat] ?? YearShowTypeValue[YearShowType.FULL]
  return moment(`${val}`).format(config?.showFormat ?? 'YYYY')
}
/**
 * 月
 * @param val 1-12
 * @param record
 * @param config
 * @returns
 */
export const monthRender = (val: any, record: any, config: any) => {
  if (val === undefined || val === null) return val;
  const temp = config?.showFormat === 'MM' ? (val < 10 ? `0${val}` : `${val}`) : parseInt(`${val}`)
  return temp
}
/**
 * 年月
 * @param val 2021-01
 * @param record
 * @param config
 * @returns
 */
export const yearMonthRender = (val: any, record: any, config: any) => {
  if (!val) return val;
  // const defaultFormat = YearMonthShowTypeValue[config?.showFormat] ?? YearMonthShowTypeValue[YearMonthShowType.FULL_NORMAL]
  return moment(`${val}`).format(config?.showFormat ?? 'YYYY-MM')
}
/**
 * 枚举 √
 * @param val
 * @param record
 * @param config
 * @returns
 */
export const enumRender = (val: any, record: any, config: any) => {
  if (!val) return val;
  const { enumConfig: { enumList } = { enumList: [] } } = config;
  const current = enumList?.find((o: any) => o.value === val)
  return current?.name ?? val;
}
/** 公式 */
export const formulaRender = (val: any, record: any, config: any) => {
  // const { resultType } = config;
  return val
}

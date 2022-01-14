/**
 * 数据转换
 */
import { DateShowType, AlignType, AlignColumnType, CurrencyShowType } from '@/constants/constant'

// 对参数进行保留[fixed]位小数操作
export const appToFixed = (currencyText: number, fixed: number) => {
  try {
    const arrayEnd = fixed !== undefined ? currencyText.toFixed(fixed).split('') : currencyText.toString().split('')
    // 判断小数点的位置
    let pointIndex = arrayEnd.indexOf('.') + 1
    if (pointIndex === 0) {
      // 不存在小数点时
      pointIndex = arrayEnd.length
    }
    // 判断有几位小数 ! 可能存在236.00000的情况
    // 判断需要补充的0有几位
    const count = fixed - arrayEnd.length - pointIndex
    // 当需要补充的位数不为0位时加0
    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        arrayEnd.push('0')
      }
    }
    return arrayEnd.join('')
    // return parseFloat(currencyText.toFixed(fixed))
  } catch {
    return currencyText
  }
}

// 转换千位符
export const appToLocaleString = (currencyText: any) => {
  try {
    return currencyText.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  } catch {
    return currencyText
  }
}

// 转化货币显示格式
export const currencyTransform = (currencyText: any, showDigits: number, currencyShowType: CurrencyShowType) => {
  switch (currencyShowType) {
    case CurrencyShowType.THOUSAND_SEPARATORS:
      return appToLocaleString(appToFixed(currencyText, showDigits))
    case CurrencyShowType.NORMAL:
      return appToFixed(currencyText, showDigits)
    default:
      return appToFixed(currencyText, showDigits)
  }
}

// 获取时间戳
export const getTimeStamp = (dateText: string) => {
  const timeStamp = new Date(dateText).getTime()
  if (isNaN(timeStamp)) {
    return dateText
  } else {
    return timeStamp
  }
}

// 转换日期显示格式
export const dateTransform = (dateText: string, dateShowType: DateShowType) => {
  const timeStamp = new Date(dateText).getTime()
  if (isNaN(timeStamp)) {
    return dateText
  } else {
    const slashDateText = new Date(timeStamp).toLocaleDateString()
    const hyphenDateText = slashDateText.replace(/\//g, '-')
    switch (dateShowType) {
      case DateShowType.HYPHEN_NON_PREFIX:
        return hyphenDateText
      case DateShowType.HYPHEN_PREFIX:
      {
        const hyphenArray: string[] = slashDateText.split('/') ?? []
        if (Number(hyphenArray[1]) < 10) {
          hyphenArray[1] = '0' + hyphenArray[1]
        }
        if (Number(hyphenArray[2]) < 10) {
          hyphenArray[2] = '0' + hyphenArray[2]
        }
        return hyphenArray.join('-')
      }
      case DateShowType.SLASH_NON_PREFIX:
        return slashDateText
      case DateShowType.SLASH_PREFIX:
      {
        const hyphenArray: string[] = slashDateText.split('/') ?? []
        if (Number(hyphenArray[1]) < 10) {
          hyphenArray[1] = '0' + hyphenArray[1]
        }
        if (Number(hyphenArray[2]) < 10) {
          hyphenArray[2] = '0' + hyphenArray[2]
        }
        return hyphenArray.join('/')
      }
      default:
        return dateText
    }
  }
}

// 表格内容的显示位置
export const alignTransform = (contentAlign: AlignType) => {
  switch (contentAlign) {
    case AlignType.LEFT:
      return AlignColumnType.COLUMN_LEFT
    case AlignType.CENTER:
      return AlignColumnType.COLUMN_CENTER
    case AlignType.RIGHT:
      return AlignColumnType.COLUMN_RIGHT
  }
}

// 获取一个字符串中的汉字个数，数字个数，字母个数，以及
export const stringTransform = (stringSt: string) => {
  // 字符串的汉字个数
  const chineseCharacterCount = (stringSt.match(/[\u4e00-\u9fa5]/g) ?? []).length
  // 字符串的数字个数
  const mathCount = (stringSt.match(/[0-9]/g) ?? []).length
  // 字符串中的字母个数
  const wordCount = (stringSt.match(/[a-z][A-Z]/g) ?? []).length
  // 其他字符的个数
  const otherCount = stringSt.length - chineseCharacterCount - mathCount - wordCount
  return {
    chineseCharacterCount,
    mathCount,
    wordCount,
    otherCount
  }
}

// 获取一个字符串的字符数量
export const stringCharacterCount = (stringSt: string): number => {
  const stringEnd = stringTransform(stringSt)
  const { chineseCharacterCount, mathCount, wordCount, otherCount } = stringEnd
  return chineseCharacterCount * 2 + mathCount + wordCount + otherCount
}

// 防抖函数
export const deBounce = (func: any, delay: number) => {
  let timer: any = null
  return function (...args: any) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

// 深拷贝
export const deepCopy = (dataSt: any, errorOutput?: any) => {
  try {
    return JSON.parse(JSON.stringify(dataSt))
  } catch {
    return errorOutput
  }
}

// 解析关联字段的显示格式
export const refTransform = (refFormatSt: string): any[] => {
  // 去空格
  const refFormat = refFormatSt.replace(/ {1,}/g, '')
  const matchDollarString = refFormat.match(/(\$\{)[a-z0-9_]*(\})/g) ?? []
  return matchDollarString.map(matchDollar => {
    return {
      id: matchDollar.slice(2, -1)
    }
  })
}

// 关联字段依据显示内容
export const refFormatTransform = (showFormatSt: string, recordData: []): string => {
  const refFormat = showFormatSt.replace(/ {1,}/g, '')
  const matchDollarString = refFormat.match(/(\$\{)[a-z0-9_]*(\})/g) ?? []
  const fieldArr = matchDollarString.map(matchDollar => {
    return matchDollar.slice(2, -1)
  })
  const text: string[] = []
  recordData.forEach(data => {
    let dataText = refFormat
    matchDollarString.forEach((matchDollar, matchIndex) => {
      dataText = dataText.replace(matchDollar, data[fieldArr[matchIndex]] || '')
    })
    text.push(dataText)
  })
  // 返回字符串
  // 如果存在计算公式不标准，当data为空时，直接输出对应的计算公式内容
  // return text.length > 0 ? text.join(',') : showFormatSt
  return text.join(',')
}

export const getGlobalValue = (key: string) => {
  enum EnumGlobalType {
    DURATION_VALUE = 'DURATION_VALUE',
    DURATION_START_DATE = 'DURATION_START_DATE',
    DURATION_END_DATE = 'DURATION_END_DATE',
    COMPANY_NAME = 'COMPANY_NAME',
    COMPANY_CODE = 'COMPANY_CODE',
    USER_ID = 'USER_ID',
    // 期间值 期间起始日期 期间终止日期 公司名称 公司代码 账户id
  }
  switch (key) {
    case EnumGlobalType.DURATION_VALUE:
      return window.top?.Mainframe.getDuration();
    case EnumGlobalType.COMPANY_CODE:
      return window.top?.Mainframe.getOrgnization();
    case EnumGlobalType.COMPANY_NAME:
      return window.top?.Mainframe.getOrgnization();// ??
    case EnumGlobalType.DURATION_END_DATE:
      return window.top?.Mainframe.getDurationObj()?.endDate;
    case EnumGlobalType.DURATION_START_DATE:
      return window.top?.Mainframe.getDurationObj()?.startDate;
    case EnumGlobalType.USER_ID:
      return window.top?.Mainframe.getUserInfo()?.id;
    default:
      return key
  }
}

export const removeFromArray = (arr: any[], predicate: any) => {
  const index = arr.findIndex(predicate);
  if (index >= 0) {
    arr.splice(index, 1);
  }
  return arr;
}

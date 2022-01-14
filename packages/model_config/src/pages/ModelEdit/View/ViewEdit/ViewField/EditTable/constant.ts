
export enum AlignEnglish {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  CENTER = 'CENTER'
}

export const AlignChinese = {
  [AlignEnglish.LEFT]: '居左',
  [AlignEnglish.RIGHT]: '居右',
  [AlignEnglish.CENTER]: '居中'
}

export enum TableShowName {
  SUMMARY = '汇总',
  SUMMARY_FORMAT = '汇总显示内容',
  COLUMN_WIDTH = '列宽',
  SHOW_NAME = '显示列名',
  HEADER_ALIGN = '列头对齐',
  CONTENT_ALIGN = '内容对齐',
  CONTENT = '显示格式',
  CONTENT_FORMAT = '显示内容'
}

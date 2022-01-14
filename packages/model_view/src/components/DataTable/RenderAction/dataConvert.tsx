import renderAction from './index';

export interface DataConvertProps {
  columns: any[]
  data: any[]
  refModelInfo: any
}

/**
 * 简单字段类型数据转换
 * @param param0
 */
export const dataSimpleFieldTypeConvert = ({ columns, data, refModelInfo }: DataConvertProps) => {
  const newData: any[] = [];
  data.forEach((record: any) => {
    const temp = { ...record };
    columns.forEach((colConfig: any) => {
      // 可排除部分不需要处理的类型
      const { id: dataIndex } = colConfig;
      const val = record[dataIndex];
      temp[dataIndex] = renderAction(val, record, colConfig, refModelInfo);
    })
    newData.push(temp)
  })
  return newData;
}

export default dataSimpleFieldTypeConvert;

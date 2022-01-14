import Field from './properties/Field';
import Operation from './properties/Operation';
import OperationBar from './properties/OperationBar';
import Widget from './properties/Widget';

export interface configType {
  [key: string]: [string, React.FC<any>];
}
const config: configType = {
  field: ['字段属性', Field],
  operationBar: ['操作行属性', OperationBar],
  operation: ['操作属性', Operation],
  widget: ['控件属性', Widget],
};

export default config;

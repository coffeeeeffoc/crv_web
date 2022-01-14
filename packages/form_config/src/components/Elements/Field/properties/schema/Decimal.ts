import type { basicSchemaType } from '../basicSchema';
import { basicSchema } from '../basicSchema';
export interface Decimal extends basicSchemaType {
  formatter: {
    type: string;
    description: string;
  };
  parser: {
    type: string;
    description: string;
  };
};
const decimalSchema: Decimal = {
  ...basicSchema,
  formatter: {
    type: 'string',
    description: '自定义格式',
  },
  parser: {
    type: 'string',
    description: '解析自定义格式',
  },
};
export default decimalSchema;

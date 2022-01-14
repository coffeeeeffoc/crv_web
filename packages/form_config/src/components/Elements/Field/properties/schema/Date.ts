import type { basicSchemaType } from '../basicSchema';
import { basicSchema } from '../basicSchema';
export interface Date extends basicSchemaType {
  formatBoundary: {
    type: 'enum';
    description: string;
    options: string[];
  };
};
const dateSchema: Date = {
  ...basicSchema,
  formatBoundary: {
    type: 'enum',
    options: ['start', 'end'],
    description: '是否只读',
  }
};
export default dateSchema;

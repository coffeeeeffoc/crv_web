import type { basicSchemaType } from '../basicSchema';
import { basicSchema } from '../basicSchema';
export interface VarChar extends basicSchemaType {

};

const varCharSchema: VarChar = {
  ...basicSchema,
};

export default varCharSchema;

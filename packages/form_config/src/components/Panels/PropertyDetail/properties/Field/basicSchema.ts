export enum DISPLAY_TYPE {
  FORM = 'FORM',
  TEXT = 'TEXT',
};
export enum basicSchemaKeys {
  readonly = 'readonly',
  display = 'display',
  required = 'required',
  control = 'control',
  format = 'format',
  defaultValue = 'defaultValue',
};

export type basicSchemaType = {
  [key in basicSchemaKeys]: {
    type: string | string[];
    description: string;
    options?: string[];
  };
};

export const basicSchema: basicSchemaType = {
  readonly: {
    type: 'boolean',
    description: '是否只读',
  },
  display: {
    type: 'enum',
    options: ['FORM', 'TEXT'],
    description: '显示为表单还是文本',
  },
  required: {
    type: 'boolean',
    description: '是否必填',
  },
  control: {
    type: 'string',
    description: '控件',
  },
  format: {
    type: 'string',
    description: '显示格式',
  },
  defaultValue: {
    type: 'string',
    description: '默认值',
  },
};

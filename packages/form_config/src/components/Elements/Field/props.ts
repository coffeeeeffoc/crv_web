// 该控件的disabled和visible属性用的场景更少，不是还是打算支持之。
/**
 * expression支持变量user,system,systemSetting以及当前表单的所有字段
 */
export const props = {
  style: {
    // ...
  },
  disabled: {
    type: 'function',
    formula: 'function(data){return data.flag === 1;}',
  },
  disabled1: {
    type: 'expression',
    formula: '${flag} === 1',
  },
  visible: {
    type: 'function',
    formula: 'function(data){return data.flag === 1;}',
  },
  visible1: {
    type: 'expression',
    formula: '${flag} === 1',
  },
  validateRules: [
    {
      case: '',
      rule: /\d+/,
      rule1: {
        type: 'expression',
        formula: '${flag} === 1',
      },
      rule2: {
        type: 'function',
        formula: 'function(data){return data.flag === 1;}',
      },
      message: null,
      message1: 'xxx',
      message2: {
        type: 'function',
        formula: 'function(data){return data.flag === 1 ? "xxx" : "yyy";}',
      },
    }
  ],
  control: '',
  control1: {
    type: 'function',
    formula: 'function(data){return data.flag === 1 ? "x" : "y";}',
  },
  // defaultValue
  // editable
  // required
};

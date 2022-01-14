// 该控件的disabled和visible属性用的场景更少，不是还是打算支持之。
/**
 * expression支持变量user,system,systemSetting以及当前表单的所有字段
 */
export const props = {
  style: {
    // ...
    display: 'flex',
    textAlign: 'right',
    flexDirection: '',
    flexWrap: '',
    justifyContent: '', // grid flex
    // justifyItems: '', // grid
    alignContent: '', // grid flex
    alignItems: '', // grid flex
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
};

// export const propsSchema = {
//   style: {
//     type: 'Object'
//   }
// };
export const props = {
  style: {
    // ...
    // width: '70px',
    // color: 'red',
    // backgroundColor: 'red',
    // margin: '0 5px',
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

import { CustomProps } from '@@/Panels/PropertyDetail/Common';
// import { customConfigFormTable } from './formTableCustomConfig';
import FormTableProperties from './FormTableProperties';

const customConfig = {
  formTableProperties: {
    header: '明细表属性',
    Component: FormTableProperties,
  },
};

export default function Widget ({
  value,
  onChangeProps,
  ...additionProps
}: any) {
  const isFormTable = additionProps?.id === 'formTable';
  console.log('additionProps', additionProps);
  isFormTable && console.log('additionProps--isFormTable', value);
  return (
    <CustomProps
      types={isFormTable ? [] : ['style', 'disabled', 'visible']}
      value={value}
      onChange={onChangeProps}
      customConfig={isFormTable ? customConfig : {} }
    />
  );
};

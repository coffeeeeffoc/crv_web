import FormConfigLayout from '@/components/FormConfigLayout';
import ModelContainer from '@/businessComponents/ModelContainer';
import { ConfigEditTypeContext } from '@/context';
import { EnumConfigEditType } from '@utils/types';

export default (props: any) => {
  return (
    <ModelContainer {...props} >
      <ConfigEditTypeContext.Provider value={EnumConfigEditType.update} >
        <FormConfigLayout/>
      </ConfigEditTypeContext.Provider>
    </ModelContainer>
  );
};

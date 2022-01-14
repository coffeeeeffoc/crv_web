import {
  useState,
  createContext,
  useCallback,
} from 'react';
import BasicFormTableProperties from './BasicFormTableProperties';
import { propertiesConfig } from './propertiesConfig';
import { useCurrentAddition } from './hooks';

export const BasicFormTablePropertiesContext = createContext<{
  configState?: any;
  setConfigState?: React.Dispatch<React.SetStateAction<{}>>;
  setPartialConfigState?: (val: Object) => void;
}>({});

export default ({
  value,
  onChange,
}: any) => {
  const currentAddition = useCurrentAddition();
  console.log(currentAddition);
  const [configState, setConfigState] = useState({});
  const setPartialConfigState = useCallback(val => {
    setConfigState(state => ({
      ...state,
      ...val,
    }));
  }, []);
  return (
    <BasicFormTablePropertiesContext.Provider value={{ configState, setConfigState, setPartialConfigState }} >
      <BasicFormTableProperties {...{
        propertiesConfig,
        value,
        onChange,
      }} />
    </BasicFormTablePropertiesContext.Provider>
  );
};

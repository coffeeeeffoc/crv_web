import { createSlice } from '@reduxjs/toolkit';

interface basicObjectType {
  [key: string]: number | string;
};
interface instancesType {
  [key: string]: basicObjectType;
};
export interface defaultFieldsValueType extends basicObjectType {

};

export interface gridPropsType {
  defaultFieldsValue: defaultFieldsValueType;
  instances: instancesType;
  currentInstanceId?: string;
};

const initialState = {
  // 属性面板的值
  defaultFieldsValue: {
    explicitType: 'explicit',
    children: 15,
    rowCount: 3,
    columnCount: 5,
    rowHeight: '40px',
    columnWidth: '1fr',
    rowGap: '16px',
    columnGap: '16px',
    direction: 'row',
    emptySpace: 'dontFill',
    gridAlignHorizontal: 'center',
    gridAlignVertical: 'center',
  },
  // 每个属性实例对应的属性值
  instances: {

  } as any,
  // 当前属性实例的id
  currentInstanceId: undefined,
};

export const {
  actions,
  reducer,
  ...rest
} = createSlice({
  name: 'gridProps',
  initialState,
  reducers: {
    setState: (state: any, { payload: { init, data } }) => {
      return init ? initialState : data;
    },
    setDefaultFieldsValue: (state: any, { payload }: { payload: basicObjectType}) => {
      state.defaultFieldsValue = {
        ...state.defaultFieldsValue,
        ...payload,
      };
    },
    setDefaultInstance: (state: any, { payload }) => {
      const id = payload;
      state.currentInstanceId = id;
      // 此处state.defaultFieldsValue可能需要深拷贝，也可能不需要。暂时没深拷贝
      state.instances[id] = state.defaultFieldsValue;
    },
    setInstance: (state: any, { payload: { id, props } = {} }) => {
      state.currentInstanceId = id;
      state.instances[id] = props;
    },
    setInstanceValue: (state: any, { payload: { id, props } = {} }) => {
      state.currentInstanceId = id;
      state.instances[id] = {
        ...state.instances[id],
        ...props,
      };
    },
    setCurrentInstanceId: (state: any, { payload }) => {
      state.currentInstanceId = payload;
    },
  },
  extraReducers: (builder) => {
  },
});
export default reducer;

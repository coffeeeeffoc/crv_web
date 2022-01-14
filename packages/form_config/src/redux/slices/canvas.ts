import { createSlice } from '@reduxjs/toolkit';
import { createGridState } from '@/utils/store/grid';
import type { AreaState, SelectionAreaType } from '@/types';
import { createAreaState } from '@/utils/store/area';
import { getType } from '@utils/browser/utils';

export const basicArea: AreaState = createAreaState({
  id: 'container',
  type: 'section',
  display: 'grid',
  grid: createGridState(),
  gridArea: 'auto',
  justifySelf: 'center',
  alignSelf: 'center',
  width: 'auto',
  height: 'auto',
  color: '#1e1e1e',
});

// 默认值为null；当鼠标移动所在的gridCell为区域时，类型为AreaState；当gridCell未创建区域时，id为区域的id，target为gridCell的位置信息；
export type dropActiveAreaType = {
  parent: string; // 父级area的id
  id: { // 父级area的gridCell的属性
    row: number;
    col: number;
  };
} | AreaState | null;

const initialState = {
  // 区域（嵌套层级结构）
  areas: basicArea,
  // 当前区域（当前选中区域的父级区域）
  currentAreaId: basicArea.id,
  // 当前按钮
  currentOperationId: null,
  // css的grid-template-areas中，鼠标移入到某个名字时，使该名字对应的区域高亮
  currentHover: null as any,
  // 当前选中区域，默认为null
  selectionArea: null as SelectionAreaType,
  // 所划分的区域添加的属性
  areaAdditions: {
    // areaId: {
    //   field: {},
    //   widget: {},
    // },
  } as any,
  // 暂不清楚什么作用
  overArea: null as any,
  // 暂不清楚什么作用
  currentFocus: null as any,
  // 暂不清楚什么作用
  dragging: null as any,
  // // 拖拽激活的区域
  dropActiveArea: null as dropActiveAreaType,
};

export const {
  actions,
  reducer,
} = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    clearSelectionArea: (state: any, { payload }) => {
      state.selectionArea = null;
    },
    setSelectionArea: (state: any, { payload }) => {
      state.selectionArea = payload;
    },
    setAreaAdditions: (state: any, { payload: { id, key, value } }) => {
      const additions = state.areaAdditions[id] = state.areaAdditions[id] || {};
      additions[key] = value;
      const values = Object.values(additions);
      if (values.length === 0 || values.every(v => v === undefined)) {
        delete state.areaAdditions[id];
      }
    },
    setAreaAdditionProps: (state: any, { payload: { id, key, props } }) => {
      state.areaAdditions[id] = state.areaAdditions[id] || {};
      const target = state.areaAdditions[id][key];
      if (getType(target) === 'Object') {
        state.areaAdditions[id][key].props = props;
      }
    },
    removeAreaAdditionById: (state: any, { payload }) => {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete state.areaAdditions[payload];
    },
    set: (state: any, { payload: { key, value } }) => {
      state[key] = value;
    },
    setMultiState: (state: any, { payload }) => {
      return {
        ...state,
        ...payload,
        // 当设置当前区域currentAreaId时，直接置当前操作为null空值
        ...(payload.currentAreaId && {
          currentOperationId: null,
        }),
      };
    },
  },
  extraReducers: (builder) => {
  },
});

export default reducer;

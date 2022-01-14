import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
// import { actions as canvasActions } from './canvas';
// import store from '../store';

export interface snapshotType {
  snapshotData: any[];
  snapshotIndex: number;
};
const initialState = {
  snapshotData: [] as any[],
  snapshotIndex: -1,
};

export const {
  actions,
  reducer,
} = createSlice({
  // 快照，方便回退(undo)操作和恢复(redo)操作
  name: 'snapshot',
  initialState,
  reducers: {
    undo: (state, { payload }) => {
      if (state.snapshotIndex >= 0) {
        state.snapshotIndex--;
      }
    },
    redo: (state, { payload }) => {
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotIndex++;
      }
    },
    recordCurrentSnapshot: (state, { payload }) => {
    },
    recordSnapshot: (state, { payload }) => {
      // 添加新的快照
      state.snapshotData[++state.snapshotIndex] = cloneDeep(payload);
      // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1);
      }
    },
  },
  extraReducers: (builder) => {
  },
});

export default reducer;

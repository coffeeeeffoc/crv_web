import { createSlice } from '@reduxjs/toolkit';
// import { message } from 'antd';
// import { POST_REQUEST } from '@/services/asyncPost'
// import * as api from '@/services/model';

// TODO:api在此处的调用有问题 待调整
// export const post = api.CommonPost();
// const { commonPost } = POST_REQUEST;

export const CommonSlice = createSlice({
  name: 'common',
  initialState: {
    // 唯一Code：{}
  },
  reducers: {
    clear (state: any, { payload }) {
      delete state[payload];
    },
    setStatus (state: any, { payload }) {
      const { uuid } = payload;
      state[uuid] = { ...state[uuid], ...payload };
    }
  },
  extraReducers: {
    // [commonPost.pending.type]: (state, action) => {
    //   if (!state[action.meta.arg.uuid]) { state[action.meta.arg.uuid] = {}; }
    //   state[action.meta.arg.uuid].loading = true;
    //   state[action.meta.arg.uuid][action.meta.arg.operator] = "pending";
    //   return state;
    // },
    // [commonPost.fulfilled.type]: (state, { payload }) => {
    //   console.info("CommonSlice.post.fulfilled", payload)
    //   const { uuid, status, result, operator } = payload;
    //   if (!state[uuid]) { state[uuid] = {}; }
    //   if (status === 200) {
    //     state[uuid] = { ...state[uuid], ...result, loading: false, [operator]: "fulfilled" };
    //   } else {
    //     message.error(payload.message);
    //     state[uuid] = { ...state[uuid], loading: false };
    //   }
    // },
    // [commonPost.rejected.type]: (state, { payload }) => {

    // }
  }
})

export const { setStatus, clear } = CommonSlice.actions;
export default CommonSlice.reducer;

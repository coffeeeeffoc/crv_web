import { configureStore } from '@reduxjs/toolkit';
import data from './slices/dataSlice';
import config from './slices/configSlice';

export default configureStore({
  // 合并多个Slice
  reducer: {
    data,
    config,
  }
})

import { configureStore } from '@reduxjs/toolkit';
import gridProps from './slices/gridProps';
import layoutConfigSetting from './slices/layoutConfigSetting';
import canvas from './slices/canvas';
import snapshot from './slices/snapshot';
import createSagaMiddleware from 'redux-saga';
// import { undo } from './saga/snapshot';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  // 合并多个Slice
  reducer: {
    gridProps,
    layoutConfigSetting,
    canvas,
    snapshot,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export default store;

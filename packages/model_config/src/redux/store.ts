import { configureStore } from '@reduxjs/toolkit';
import modelList from './slices/modelList';
import modelEdit from './slices/modelEdit';
import field from './slices/field';
import view from './slices/view';
import operation from './slices/operation';
import operationUrl from './slices/operationUrl';
import formConfig from './slices/formConfig'
export default configureStore({
  // 合并多个Slice
  reducer: {
    modelList,
    modelEdit,
    field,
    view,
    operation,
    operationUrl,
    formConfig
  }
})

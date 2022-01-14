import type { RouteConfig } from './index';
// import SelectModel from '@/pages/SelectModel';
// import ModelFormEdit from '@/pages/ModelFormEdit';
// import ModelFormCreate from '@/pages/ModelFormCreate';
// import FormView from '@/pages/FormView';
import React from 'react';

const SelectModel = React.lazy(() => import('@/pages/SelectModel'));
const ModelFormEdit = React.lazy(() => import('@/pages/ModelFormEdit'));
const ModelFormCreate = React.lazy(() => import('@/pages/ModelFormCreate'));
const FormView = React.lazy(() => import('@/pages/FormView'));
const FormTableProperties = React.lazy(() => import('@@/Panels/PropertyDetail/properties/Widget/FormTableProperties'));
const TestForm = React.lazy(() => import('@/pages/TestForm'));

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: FormTableProperties,
  },
  {
    path: '/testForm',
    exact: true,
    component: TestForm,
  },
  {
    path: '/config/model/:modelId/form/:formId',
    exact: true,
    component: ModelFormEdit,
  },
  {
    path: '/config/model/:modelId/create',
    exact: true,
    component: ModelFormCreate,
  },
  {
    path: '/config/selectModel',
    exact: true,
    component: SelectModel,
  },
  {
    path: '/view/model/:modelId/form/:formId/:editType/:id',
    component: FormView,
  },
  {
    path: '/view/model/:modelId/form/:formId/:editType',
    component: FormView,
  },
];

export default routes;

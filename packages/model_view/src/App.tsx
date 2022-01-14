import {
  BrowserRouter,
  Route,
  // Router,
  Redirect,
  Switch
} from 'react-router-dom'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClientProvider, QueryClient } from 'react-query';
import { DndProvider } from 'react-dnd';
// import { RenderRoute } from './router';
import { FC } from 'react';
import { Provider } from 'react-redux';
import store from '@/redux';
// import type { RouteConfig } from '@/interfaces/RouteConfig';
import List from '@/pages/List';
import Error from '@/pages/Error';

/**
 * 路由配置
 */
// const routes: RouteConfig[] = [
//   {
//     path: '/:modelId',
//     exact: true,
//     component: List,
//   },
//   {
//     path: '/list',
//     exact: true,
//     component: List,
//   }
// ];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 禁用窗口重新获取焦点时自动重新请求
      refetchOnWindowFocus: false,
      // 多次尝试时，每次尝试的时延加倍
      retryDelay: attemptIndex => Math.min(5000 * 2 ** attemptIndex, 30000),
    },
  },
});

const App: FC<{}> = () => (
  <QueryClientProvider client={queryClient}>
    <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/crv_model_view" component={List} exact></Route>
          <Route path="/404" component={Error} exact></Route>
          <Redirect from="/" to="/crv_model_view" />
          {/* {
            routes.map((route, index) => <RenderRoute key={index} {...route} />)
          } */}
        </Switch>
      </BrowserRouter>
      {/* <List /> */}
    </Provider>
  </DndProvider>
  </QueryClientProvider>
);
export default App;

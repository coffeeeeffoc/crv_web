import {
  BrowserRouter,
  // Route,
  // Router,
  Redirect,
  Switch
} from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { routes, RenderRoute } from './router';
import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query';
import store from '@/redux';
import { ReactQueryDevtools } from 'react-query/devtools';
import Loading from '@rc/Loading';
import { ConfigProvider } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import '@utils/browser/locales/moment';

if (process.env.NODE_ENV === 'development') {
  // require('@/mock');
}

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
  <QueryClientProvider client={queryClient} >
    <DndProvider backend={HTML5Backend}>
      <Provider store={store} >
        <ConfigProvider locale={locale}>
          <BrowserRouter basename={process.env.PUBLIC_URL} >
            <Suspense fallback={<Loading />}>
              <Switch>
                {
                  routes.map((route, index) => <RenderRoute key={index} {...route} />)
                }
                <Redirect from='/' to='/config/selectModel' />
              </Switch>
            </Suspense>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </DndProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
export default App;

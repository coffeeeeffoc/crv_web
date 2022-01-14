import { FC } from 'react';
import { Route } from 'react-router-dom';
export interface RouteConfig {
  path?: string;
  exact?: boolean;
  to?: string | string[] | object;
  children?: [];
  component?: FC<ComponentProps>;
  routes?: RouteConfig[];
}
interface ComponentProps {
  routes?: RouteConfig[];
  [propName: string]: any;
}
const RenderRoute: FC<RouteConfig> = ({
  path,
  component: Component,
  routes,
}: RouteConfig) => {
  return (
    <Route
      path={path}
      render={props => (
        (Component != null) ? <Component {...props} routes={routes} /> : null
      )}
    />
  );
};
export {
  RenderRoute,
};
export { default as routes } from './router.config';

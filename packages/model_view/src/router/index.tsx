import { FC } from 'react';
import { Route } from 'react-router-dom';
import RouteConfig from '@/interfaces/RouteConfig';

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
export const a = 1;

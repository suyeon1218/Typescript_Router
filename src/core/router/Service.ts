import Router, { RouteType } from './Router';

export function createRouter(routes: RouteType[]) {
  return Router.createRouter(routes);
}

export function navigate(url: string) {
  return Router.navigate(url);
}

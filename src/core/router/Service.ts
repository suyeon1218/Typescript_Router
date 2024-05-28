import Component from '../components/Component';
import Router, { Params, Route } from './Router';

interface Outlet {
  $outlet: typeof Component | null;
  params: undefined | Params;
}

export function createRouter(routes: Route[]) {
  return Router.createRouter(routes);
}

export function navigate(url: string) {
  return Router.navigate(url);
}

export function Outlet(observe: () => void) {
  const element = Router.outlets.pop()?.element;

  Router.observes.push(observe);

  return element as typeof Component;
}

export function getParams() {
  const outletLength = Router.outlets.length;

  return Router.currRoutes[outletLength].params;
}

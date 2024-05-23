import Component from '../components/Component';
import Router, { Route } from './Router';

export function createRouter(routes: Route[]) {
  return Router.createRouter(routes);
}

export function navigate(url: string) {
  return Router.navigate(url);
}

export function Outlet(observe: () => void) {
  const $element = Router.outlets.pop()?.element;

  Router.observes.push(observe);

  return $element as typeof Component;
}

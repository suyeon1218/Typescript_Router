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

export function Outlet() {
  const outletIndex = document.querySelectorAll('#outlet').length - 1;

  if (outletIndex < Router.currRoutes.length) {
    const { element } = Router.currRoutes[outletIndex];

    return element;
  }

  return null;
}

export function getParams() {
  const outletIndex = document.querySelectorAll('#outlet').length;

  return Router.currRoutes[outletIndex - 1].params;
}

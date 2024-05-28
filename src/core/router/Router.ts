import Component from '~/core/components/Component';
import { findRoute } from './Util';

export interface Route {
  path: string;
  element: typeof Component;
  children?: Route[];
}

export interface Params {
  [key: string]: any;
}

export type CurrRoute = Route & { params: Params | undefined };

class Router {
  private routes: Route[] | undefined;
  outlets: CurrRoute[];
  currRoutes: CurrRoute[];
  observes: (() => void)[];

  constructor() {
    this.outlets = [];
    this.currRoutes = [];
    this.observes = [];
  }

  createRouter(routes: Route[]) {
    this.routes = routes;
    this.routing();

    return this;
  }

  navigate(url: string) {
    if (url === location.pathname) return;

    history.pushState(null, '', url);
    this.routing();
  }

  routing() {
    if (this.routes === undefined) return;

    const nextRoutes = findRoute(location.pathname, '/', this.routes);
    const nextOutlets = [...nextRoutes];
    let lastRender = undefined;

    if (this.observes.length > 0) {
      for (let index = this.currRoutes.length - 1; index >= 0; index--) {
        if (this.currRoutes[index].path !== nextRoutes[index].path) {
          lastRender = this.observes[index];
          break;
        }
        nextOutlets.pop();
      }
    }
    this.currRoutes = [...nextRoutes];
    this.outlets = [...nextRoutes];
    lastRender && lastRender();
  }
}

const router = new Router();

export default router;

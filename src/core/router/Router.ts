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
  currRoutes: CurrRoute[];

  constructor() {
    this.currRoutes = [];
  }

  createRouter(routes: Route[]) {
    this.routes = routes;
    this.routing();

    return this;
  }

  navigate(url: string) {
    history.pushState(null, '', url);
    this.routing();
  }

  routing() {
    if (this.routes) {
      this.currRoutes = findRoute(location.pathname, '', this.routes);
    }
  }
}

const router = new Router();

export default router;

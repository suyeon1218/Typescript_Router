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
    history.pushState(null, '', url);
    this.routing();
  }

  routing() {
    if (this.routes) {
      const nextRoutes = findRoute(location.pathname, '/', this.routes);
      this.outlets = [...nextRoutes];

      if (this.observes.length > 0) {
        let lastRender = this.observes[this.observes.length - 1];

        for (let index = 0; index < this.currRoutes.length - 1; index++) {
          if (this.currRoutes[index].path !== nextRoutes[index].path) {
            lastRender = this.observes[index];
            break;
          } else {
            this.outlets.pop();
          }
        }
        lastRender && lastRender();
      } else {
        this.outlets = [...nextRoutes];
      }
      this.currRoutes = nextRoutes;
    }
  }
}

const router = new Router();

export default router;

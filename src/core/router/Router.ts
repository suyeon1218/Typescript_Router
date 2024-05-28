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
    console.log(this.observes);

    const nextRoutes = findRoute(location.pathname, '/', this.routes);
    const nextOutlets = [...nextRoutes];
    let lastObserve = undefined;
    let lastRenderIndex = 0;

    if (this.observes.length > 0) {
      while (nextOutlets.length > 0 && this.currRoutes.length > 0) {
        if (
          nextOutlets[nextOutlets.length - 1].path !==
          this.currRoutes[this.currRoutes.length - 1].path
        ) {
          break;
        }
        lastRenderIndex += 1;
        nextOutlets.pop();
        this.currRoutes.pop();
      }

      lastObserve = this.observes[lastRenderIndex];

      while (this.observes.length > lastRenderIndex) {
        this.observes.pop();
      }
    }

    this.currRoutes = [...nextRoutes];
    this.outlets = [...nextOutlets];

    lastObserve && lastObserve();
  }
}

const router = new Router();

export default router;

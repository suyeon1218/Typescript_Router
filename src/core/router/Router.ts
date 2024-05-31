import Component from '~/core/components/Component';
import { findRenderNode, findRoute } from './Util';

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

    window.addEventListener('popstate', () => {
      this.routing();
    });
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

    if (this.currRoutes) {
      const [renderNode, $element] = findRenderNode(
        nextRoutes,
        this.currRoutes
      );

      if (renderNode instanceof HTMLElement) {
        renderNode.innerHTML = '';
        new $element({ $target: renderNode });
      } else {
        const $app = document.querySelector('.App');
        new $element({ $target: $app });
      }
    }

    this.currRoutes = [...nextRoutes];
  }
}

const router = new Router();

export default router;

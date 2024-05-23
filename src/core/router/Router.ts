import Component from '~/core/components/Component';

export interface RouteType {
  path: string;
  element: typeof Component;
  children?: RouteType[];
}

class Router {
  private routes: RouteType[] | undefined;
  private $target: Element | undefined;
  route: { Element: typeof Component | undefined };

  constructor() {
    this.route = { Element: undefined };
  }

  render(selector?: string) {
    const $target = selector ? document.querySelector(selector) : this.$target;

    if ($target instanceof Element && this.route.Element) {
      const { Element } = this.route;

      this.$target = $target;
      new Element({ $target });
    }
  }

  createRouter(routes: RouteType[]) {
    this.routes = routes;
    this.routing();

    return this;
  }

  navigate(url: string) {
    history.pushState(null, '', url);
    this.routing();
    this.render();
  }

  routing() {
    const currentRoute = this.routes?.find((route) => {
      if (route.path === '') {
        return route;
      }

      const LocationPathName = '/' + location.pathname.split('/')[1];
      return LocationPathName === route.path;
    });

    if (currentRoute && this.route) {
      this.route.Element = currentRoute.element;
    }
  }
}

const router = new Router();

export default router;

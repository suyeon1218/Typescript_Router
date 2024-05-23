import { Route, CurrRoute, Params } from './Router';

export function findRoute(URL: string, currPath: string, routes: Route[]) {
  const currRoute: CurrRoute[] = [];

  function find(currPath: string, childrenRoutes: Route[]) {
    for (const route of childrenRoutes) {
      const { path, children } = route;
      const nextPath = (currPath + path).replace('//', '/');
      const { isMatched, params } = isMathcedPath(URL, nextPath);

      if (isMatched) {
        currRoute.push({ ...route, params });
        return currRoute;
      }
      if (children) {
        const matchedRoute = find(nextPath, children);

        if (matchedRoute) {
          currRoute.push({ ...route, params });
          return route;
        }
      }
    }
    return null;
  }

  find(currPath, routes);

  return currRoute;
}

function isMathcedPath(URL: string, currPath: string) {
  const result: {
    params: Params;
    isMatched: boolean;
  } = { params: {}, isMatched: false };

  if (URL === currPath) {
    result.isMatched = true;
    return result;
  }

  const URLTokens = URL.split('/');
  const currPathTokens = currPath.split('/');

  result.isMatched =
    currPathTokens.length === URLTokens.length &&
    currPathTokens.every((token, index) => {
      if (token.startsWith(':')) {
        const [param, value] = [URLTokens[index].slice(1), token.slice(1)];
        result.params[param] = value;

        return true;
      }
      if (token === URLTokens[index]) {
        return true;
      }

      return false;
    });

  return result;
}

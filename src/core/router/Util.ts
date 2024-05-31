import { Route, CurrRoute, Params } from './Router';
import { navigate } from './Service';

function getPathString(path: string) {
  const pathToken = path.split('/');
  const purePath: string[] = [];

  for (const token of pathToken) {
    if (token.startsWith(':')) {
      break;
    }
    purePath.push(token);
  }

  return purePath.join('/');
}

export function findRoute(URL: string, currPath: string, routes: Route[]) {
  const currRoute: CurrRoute[] = [];

  function find(currPath: string, childrenRoutes: Route[]) {
    for (const route of childrenRoutes) {
      const { path, children } = route;
      const nextPath = (currPath + path).replace('//', '/');
      const { isMatched, params, paramId } = isMathcedPath(URL, nextPath);
      const purePath = getPathString(path);

      if (isMatched) {
        paramId
          ? currRoute.push({
              ...route,
              path: `${purePath}/${params[paramId]}`,
              params,
            })
          : currRoute.push({ ...route, path: purePath, params });
        return currRoute;
      }
      if (children) {
        const matchedRoute = find(nextPath, children);

        if (matchedRoute) {
          paramId
            ? currRoute.push({
                ...route,
                path: `${purePath}/${params[paramId]}`,
                params,
              })
            : currRoute.push({ ...route, path: `${purePath}`, params });
          return route;
        }
      }
    }
    return null;
  }

  find(currPath, routes);

  if (currRoute.length === 0) {
    navigate('/404');
  }

  return currRoute;
}

function isMathcedPath(URL: string, currPath: string) {
  const result: {
    params: Params;
    isMatched: boolean;
    paramId: string | undefined;
  } = { params: {}, isMatched: false, paramId: undefined };

  const URLTokens = URL.split('/');
  const currPathTokens = currPath.split('/');

  if (URL === currPath) {
    result.isMatched = true;
    return result;
  }

  result.isMatched =
    currPathTokens.length === URLTokens.length &&
    currPathTokens.every((token, index) => {
      if (token.startsWith(':')) {
        const [param, value] = [token.slice(1), URLTokens[index]];
        result.params[param] = value;
        result.paramId = token.slice(1);

        return true;
      }
      if (token === URLTokens[index]) {
        return true;
      }

      return false;
    });

  return result;
}

export function findRenderNode(
  nextRoutes: CurrRoute[],
  currRoutes: CurrRoute[]
) {
  const outlets = document.querySelectorAll('#outlet');
  let depth = 0;
  let nextPointer = nextRoutes.length - 1;
  let currPointer = currRoutes.length - 1;

  while (
    outlets.length > depth &&
    currRoutes &&
    nextRoutes[nextPointer] &&
    currRoutes[currPointer]
  ) {
    if (nextRoutes[nextPointer].path !== currRoutes[currPointer].path) {
      break;
    }
    nextPointer -= 1;
    currPointer -= 1;
    depth += 1;
  }

  return [outlets[depth], nextRoutes[nextPointer].element] as const;
}

import App from './App';
import Item from './components/Item';
import { createRouter } from './core/router';
import MainPage from './pages/MainPage';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';

createRouter([
  {
    path: '/',
    element: MainPage,
    children: [
      {
        path: '/page1',
        element: Page1,
        children: [
          {
            path: '/:id',
            element: Item,
          },
        ],
      },
      {
        path: '/page2',
        element: Page2,
        children: [
          {
            path: '/:id',
            element: Item,
          },
        ],
      },
      {
        path: '/page3',
        element: Page3,
        children: [
          {
            path: '/:id',
            element: Item,
          },
        ],
      },
    ],
  },
]);

const $app = document.querySelector('.App');
$app && new App({ $target: $app });

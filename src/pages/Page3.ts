import Component from '~/core/components/Component';
import { Outlet, navigate } from '~/core/router';

class Page3 extends Component {
  template(): string {
    return `
      <h2>Page 3</h2>
        <ul>
          <li data-link="/page3/1">item1</li>
          <li data-link="/page3/2">item2</li>
          <li data-link="/page3/3">item3</li>
      </ul>
      <div id='outlet'></div>
      `;
  }

  addEvent(): void {
    this.$target.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement) {
        const link = event.target.dataset.link;

        link && navigate(link);
      }
    });
  }

  updated() {
    this.children(Outlet(), '#outlet');
  }
}

export default Page3;

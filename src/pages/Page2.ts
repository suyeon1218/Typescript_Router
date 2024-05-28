import Component from '~/core/components/Component';
import { Outlet, navigate } from '~/core/router';

class Page2 extends Component {
  template(): string {
    return `
      <h2>Page2</h2>
      <ul>
        <li data-link="/page2/1">item1</li>
        <li data-link="/page2/2">item2</li>
        <li data-link="/page2/3">item3</li>
      </ul>
      <div class='outlet'></div>
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
    this.children(
      Outlet(() => {
        this.render();
      }),
      '.outlet'
    );
  }
}

export default Page2;

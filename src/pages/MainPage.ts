import Component from '~/core/components/Component';
import { Outlet, navigate } from '~/core/router';

class MainPage extends Component {
  template(): string {
    return `
        <h1>메인 페이지</h1>
        <ul>
          <button data-link='/page1'>Page1</button>
          <button data-link='/page2'>Page2</button>
          <button data-link='/page3'>Page3</button>
        </ul>
        <div class='outlet page'></div>
      `;
  }

  addEvent(): void {
    this.$target.addEventListener('click', (event) => {
      if (event.target instanceof HTMLButtonElement) {
        const { link } = event.target.dataset;

        link && navigate(link);
      }
    });
  }

  updated() {
    this.children(
      Outlet(() => {
        this.render();
      }),
      '.page'
    );
  }
}

export default MainPage;

import Component from '~/core/components/Component';
import Item from '~/components/Item';

class Page2 extends Component {
  template(): string {
    return `
        <h2>Page2</h2>
        <div class='item outlet'></div>
      `;
  }

  updated() {
    this.children(Item, '.item');
  }
}

export default Page2;

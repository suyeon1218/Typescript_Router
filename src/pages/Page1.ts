import Item from '~/components/Item';
import Component from '~/core/components/Component';

class Page1 extends Component {
  template(): string {
    return `
        <h2>Page 1</h2>
        <div class='item outlet'></div>
      `;
  }

  updated() {
    this.children(Item, '.item');
  }
}

export default Page1;

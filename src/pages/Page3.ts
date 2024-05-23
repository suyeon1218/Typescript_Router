import Component from '~/core/components/Component';
import Item from '~/components/Item';

class Page3 extends Component {
  template(): string {
    return `
        <h2>Page 3</h2>
        <div class='item'></div>
      `;
  }

  updated() {
    this.children(Item, '.item');
  }
}

export default Page3;

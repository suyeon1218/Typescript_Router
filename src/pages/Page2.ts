import Component from '~/core/components/Component';
import Item from '~/components/Item';

class Page2 extends Component {
  template(): string {
    return `
        <h2>Page 2</h2>
        <div class='.outlet'></div>
      `;
  }

  mounted() {
    this.children(Item, '.outlet');
  }
}

export default Page2;

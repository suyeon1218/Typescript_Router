import Component from '~/core/components/Component';
import Item from '~/components/Item';

class Page3 extends Component {
  template(): string {
    return `
        <h2>Page 3</h2>
        <div class='.outlet'></div>
      `;
  }

  mounted() {
    this.children(Item, '.outlet');
  }
}

export default Page3;

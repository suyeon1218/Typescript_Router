import Item from '~/components/Item';
import Component from '~/core/components/Component';

class Page1 extends Component {
  template(): string {
    return `
        <h2>Page 1</h2>
        <div class='.outlet'></div>
      `;
  }

  mounted() {
    this.children(Item, '.outlet');
  }
}

export default Page1;

import Component, { ComponentProps } from '~/core/components/Component';
import { Params, getParams } from '~/core/router';

class Item extends Component {
  params: Params | undefined;

  constructor({ $target }: ComponentProps) {
    super({ $target });
    this.params = this.params ? this.params : getParams();
    this.render();
  }

  template(): string {
    return `
        <div>item${this.params?.id ? this.params.id : ''}</div>
      `;
  }
}

export default Item;

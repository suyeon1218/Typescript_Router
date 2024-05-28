import Component, { ComponentProps } from '~/core/components/Component';
import { Params, getParams } from '~/core/router';

class Item extends Component {
  params: Params | undefined;

  constructor({ $target }: ComponentProps) {
    super({ $target });
    this.params = undefined;
  }

  beforeMount(): void {
    this.params = getParams();
  }

  template(): string {
    return `
        <div>item${this.params ? this.params.id : ''}</div>
      `;
  }
}

export default Item;

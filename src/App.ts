import Component from './core/components/Component';
import { Outlet } from './core/router';

class App extends Component {
  template(): string {
    return `
        <div class='outlet main'></div>
      `;
  }

  updated() {
    this.children(
      Outlet(() => {
        this.render();
      }),
      '.main'
    );
  }
}

export default App;

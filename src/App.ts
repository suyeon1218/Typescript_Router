import Component from './core/components/Component';
import { Outlet } from './core/router';

class App extends Component {
  template(): string {
    return `
        <div id='outlet' class='main'></div>
      `;
  }

  updated() {
    this.children(Outlet(), '.main');
  }
}

export default App;

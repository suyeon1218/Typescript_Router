import Component from './core/components/Component';
import MainPage from './pages/MainPage';

class App extends Component {
  template(): string {
    return `
        <div class='main'></div>
      `;
  }

  mounted() {
    this.children(MainPage, '.main');
  }
}

export default App;

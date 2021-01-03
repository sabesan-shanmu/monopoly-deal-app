import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="/documentation"
        >
          API Documentation
        </a>
      </header>
    </div>
  );
}

export default App;

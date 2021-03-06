import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { start, stop, clear } from 'canvas-pixel';

function App() {
  useEffect(() => {
    start();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => start()}>Start</button>
        <button onClick={() => stop()}>Stop</button>
        <button onClick={() => clear()}>Clear</button>
      </header>
    </div>
  );
}

export default App;

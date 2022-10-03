import React from 'react';
import './App.css';
import {ScannerExample} from "./ScannerExample";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://github.com/mebjas/html5-qrcode"
          target="_blank"
          rel="noopener noreferrer"
        >
          Html5-qrcode example
        </a>
        <ScannerExample/>
      </header>
    </div>
  );
}

export default App;

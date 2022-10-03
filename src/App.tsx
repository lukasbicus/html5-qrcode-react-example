import React, {useState} from 'react';
import './App.css';
import {AdvancedExample} from "./AdvancedExample";
import {ScannerExample} from "./ScannerExample";

function App() {
  const [selectedExample, selectExample] = useState<'scannerExample' | 'advancedExample'>('scannerExample')
  console.log('app render')
  return (
    <div className="App">
      <header className="App-header">
        <span>
          <a
            className="App-link"
            href="https://github.com/mebjas/html5-qrcode"
            target="_blank"
            rel="noopener noreferrer"
          >
            Html5-qrcode
          </a>
          &nbsp;example
        </span>
        <p>
          <button onClick={() => {
            selectExample('scannerExample')
          }}>Show scanner example
          </button>
          <button onClick={() => {
            selectExample('advancedExample')
          }}>Show advanced example
          </button>
        </p>
        {selectedExample === 'scannerExample' && (
          <ScannerExample/>
        )}
        {selectedExample === 'advancedExample' && (
          <AdvancedExample/>
        )}
      </header>
    </div>
  );
}

export default App;

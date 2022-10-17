import React, {useCallback, useState} from 'react';
import './App.css';
import {AdvancedExample} from "./AdvancedExample";
import {ScannerExample} from "./ScannerExample";

function App() {
  const [selectedExample, selectExample] = useState<'scannerExample' | 'advancedExample'>('advancedExample')
  const [lastScannedCode, setLastScannedCode] = useState<string | undefined>(undefined)
  const handleCodeScanned = useCallback((code: string) => {
    setLastScannedCode(code)
  }, [])
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
        <div className="App-example-box">
          {selectedExample === 'scannerExample' && (
            <ScannerExample onCodeScanned={handleCodeScanned}/>
          )}
          {selectedExample === 'advancedExample' && (
            <AdvancedExample/>
          )}
        </div>
        <div>
          Last scanned code: {lastScannedCode}
        </div>
      </header>
    </div>
  );
}

export default App;

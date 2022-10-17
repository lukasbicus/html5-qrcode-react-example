import React, {useCallback, useState} from 'react';
import './App.css';
import {AdvancedExample} from "./AdvancedExample";
import {ScannerExample} from "./ScannerExample";

enum Example {
  Scanner = 'scanner',
  Advanced = 'advanced',
}

function App() {
  const [selectedExample, selectExample] = useState<Example>(Example.Scanner)
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
          <button
            onClick={() => {
              selectExample(Example.Scanner)
            }}
            className={selectedExample === Example.Scanner ? 'App-selected-button' : ''}
          >
            Show scanner example
          </button>
          <button
            onClick={() => {
              selectExample(Example.Advanced)
            }}
            className={selectedExample === Example.Advanced ? 'App-selected-button' : ''}
          >
            Show advanced example
          </button>
        </p>
        <div className="App-example-box">
          {selectedExample === Example.Scanner && (
            <ScannerExample onCodeScanned={handleCodeScanned}/>
          )}
          {selectedExample === Example.Advanced && (
            <AdvancedExample onCodeScanned={handleCodeScanned}/>
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

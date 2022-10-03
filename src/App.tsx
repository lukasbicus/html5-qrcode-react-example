import React from 'react';
import {Html5QrcodeScannerPlugin} from "./Html5QrcodeScannerPlugin";
import logo from './logo.svg';
import './App.css';

const QR_BOX = {width: 300, height: 200}
const QRCODE_REGION = 'QRCODE_REGION'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <a
          className="App-link"
          href="https://github.com/mebjas/html5-qrcode"
          target="_blank"
          rel="noopener noreferrer"
        >
          Html5-qrcode example
        </a>
      </header>
      <Html5QrcodeScannerPlugin
        qrbox={QR_BOX}
        onCodeScanned={(code: string) => {
          console.log('code', code)
        }}
        qrcodeRegionId={QRCODE_REGION}
        waitPeriod={1000}
      />
    </div>
  );
}

export default App;

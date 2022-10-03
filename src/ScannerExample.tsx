import {Html5QrcodeSupportedFormats} from "html5-qrcode";
import {Html5QrcodeScanType} from "html5-qrcode/esm/core";
import React from 'react'
import {Html5QrcodeScannerPlugin} from "./Html5QrcodeScannerPlugin";

const CONFIG = {
  fps: 4,
  qrbox: {width: 300, height: 200},
  formatsToSupport: [
    Html5QrcodeSupportedFormats.CODE_128,
    Html5QrcodeSupportedFormats.QR_CODE
  ],
  rememberLastUsedCamera: true,
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
}
const QRCODE_REGION = 'SCANNER_EXAMPLE_QRCODE_REGION'

interface IScannerExampleProps {
  onCodeScanned: (code: string) => void
}

export const ScannerExample: React.FC<IScannerExampleProps> = ({
    onCodeScanned
  }: IScannerExampleProps) => (
  <Html5QrcodeScannerPlugin
    config={CONFIG}
    onCodeScanned={onCodeScanned}
    qrcodeRegionId={QRCODE_REGION}
  />
)

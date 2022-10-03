import {Html5QrcodeSupportedFormats} from "html5-qrcode";
import {Html5QrcodeScanType} from "html5-qrcode/esm/core";
import React, {useCallback} from 'react'
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
const QRCODE_REGION = 'QRCODE_REGION_3'
const WAIT_PERIOD = 1000


export const ScannerExample: React.FC = () => {
  const handleCodeScanned = useCallback((code: string) => {
    console.log('code', code)
  }, [])
  return (
    <Html5QrcodeScannerPlugin
      config={CONFIG}
      onCodeScanned={handleCodeScanned}
      qrcodeRegionId={QRCODE_REGION}
      waitPeriod={WAIT_PERIOD}
    />
  )
}

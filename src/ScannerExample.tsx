import React, {useCallback} from 'react'
import {Html5QrcodeScannerPlugin} from "./Html5QrcodeScannerPlugin";

const QR_BOX = {width: 300, height: 200}
const QRCODE_REGION = 'QRCODE_REGION_3'
const WAIT_PERIOD = 1000
export const ScannerExample: React.FC = () => {
  const handleCodeScanned = useCallback((code: string) => {
    console.log('code', code)
  }, [])
  return (
    <Html5QrcodeScannerPlugin
      qrbox={QR_BOX}
      onCodeScanned={handleCodeScanned}
      qrcodeRegionId={QRCODE_REGION}
      waitPeriod={WAIT_PERIOD}
    />
  )
}

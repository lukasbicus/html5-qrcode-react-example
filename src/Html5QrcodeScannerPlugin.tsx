import {
  Html5QrcodeScanner,
  Html5QrcodeScannerState,
} from 'html5-qrcode'
import React, {useEffect, useRef} from 'react'
import {Html5QrcodeScannerConfig} from "./types";

interface IHtml5QrcodeScannerPluginProps {
  config: Html5QrcodeScannerConfig
  onCodeScanned: (code: string) => void
  qrcodeRegionId: string
  verbose?: boolean
  className?: string
}

export const Html5QrcodeScannerPlugin: React.FC<IHtml5QrcodeScannerPluginProps> = ((
  {
    qrcodeRegionId,
    config,
    onCodeScanned,
    verbose = false,
    className
  }: IHtml5QrcodeScannerPluginProps
) => {
  const html5QrcodeScanner = useRef<null | Html5QrcodeScanner>(null)

  useEffect(() => {
    const initiatedStates: (Array<Html5QrcodeScannerState | undefined>) = [
      Html5QrcodeScannerState.SCANNING,
      Html5QrcodeScannerState.PAUSED
    ]
    // prevent double initializing of scanner caused by (React.StrictMode)[https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects]
    if (!html5QrcodeScanner.current || initiatedStates.includes(html5QrcodeScanner.current?.getState())) {
      html5QrcodeScanner.current = new Html5QrcodeScanner(
        qrcodeRegionId,
        config,
        verbose
      )
      html5QrcodeScanner.current?.render(onCodeScanned, () => {
        // nothing scanned
      })
    }
    return () => {
      if (html5QrcodeScanner.current &&
        initiatedStates.includes(html5QrcodeScanner.current?.getState())
      ) {
        html5QrcodeScanner.current?.clear().catch((e) => {
          console.error('Failed to clear html5QrcodeScanner. ', e)
        })
      }
    }
  }, [onCodeScanned, config, qrcodeRegionId, verbose])
  return <div id={qrcodeRegionId} className={className}/>
})

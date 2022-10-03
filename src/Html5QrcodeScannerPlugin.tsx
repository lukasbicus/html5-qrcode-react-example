import {
  Html5QrcodeScanner,
  Html5QrcodeScannerState,
} from 'html5-qrcode'
import React, {forwardRef, useCallback, useEffect, useRef} from 'react'
import {Html5QrcodeScannerConfig} from "./types";

interface IHtml5QrcodeScannerPluginProps {
  config: Html5QrcodeScannerConfig
  onCodeScanned: (code: string) => void
  qrcodeRegionId: string
  waitPeriod?: number
  verbose?: boolean
  className?: string
}

export interface IHtml5QrcodeScannerPluginForwardedRef {
  pause: () => void
  resume: () => void
}

export const Html5QrcodeScannerPlugin = forwardRef<IHtml5QrcodeScannerPluginForwardedRef,
  IHtml5QrcodeScannerPluginProps>(function Html5QrcodeScannerPluginComp(
  {
    qrcodeRegionId,
    config,
    onCodeScanned,
    waitPeriod = 750,
    verbose = false,
    className
  }: IHtml5QrcodeScannerPluginProps,
  ref
) {
  const html5QrcodeScanner = useRef<null | Html5QrcodeScanner>(null)

  const resumeAfterWaitPeriod = useCallback(() => {
    setTimeout(() => {
      if (html5QrcodeScanner.current) {
        const state = html5QrcodeScanner.current?.getState()
        if (state === Html5QrcodeScannerState.PAUSED) {
          html5QrcodeScanner.current?.resume()
        }
      }
    }, waitPeriod)
  }, [waitPeriod])
  const pause = useCallback(() => {
    const state = html5QrcodeScanner.current?.getState()
    if (state === Html5QrcodeScannerState.SCANNING) {
      html5QrcodeScanner.current?.pause(true)
    }
  }, [])

  const innerRef = useRef<IHtml5QrcodeScannerPluginForwardedRef>({
    pause,
    resume: resumeAfterWaitPeriod
  })

  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(innerRef.current)
      } else {
        ref.current = innerRef.current
      }
    }
  }, [ref])

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
          // eslint-disable-next-line no-console
          console.error('Failed to clear html5QrcodeScanner. ', e)
        })
      }
    }
  }, [onCodeScanned, config, qrcodeRegionId, verbose])
  return <div id={qrcodeRegionId} className={className}/>
})

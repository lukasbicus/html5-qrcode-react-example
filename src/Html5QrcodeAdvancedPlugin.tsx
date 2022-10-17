import {
  Html5Qrcode,
  Html5QrcodeScannerState
} from 'html5-qrcode'
import React, {forwardRef, useCallback, useEffect, useRef} from 'react'
import {Html5QrcodeScannerConfig} from "./types";

interface IHtmlQrcodeAdvancedPluginProps {
  config: Html5QrcodeScannerConfig
  cameraId: string
  onCodeScanned: (code: string) => void
  qrcodeRegionId: string
  waitPeriod?: number
  verbose?: boolean
  className?: string
}

export interface IHtmlQrcodePluginForwardedRef {
  pause?: () => void
  resume?: () => void
}

const initiatedStates: (Array<Html5QrcodeScannerState | undefined>) = [
  Html5QrcodeScannerState.SCANNING,
  Html5QrcodeScannerState.PAUSED
]

export const HtmlQrcodeAdvancedPlugin = forwardRef<IHtmlQrcodePluginForwardedRef,
  IHtmlQrcodeAdvancedPluginProps>(function HtmlQrcodePluginComp(
  {
    config,
    qrcodeRegionId,
    cameraId,
    onCodeScanned,
    waitPeriod = 750,
    verbose = false,
    className
  }: IHtmlQrcodeAdvancedPluginProps,
  ref
) {
  const html5Qrcode = useRef<null | Html5Qrcode>(null)

  const resumeAfterWaitPeriod = useCallback(() => {
    setTimeout(() => {
      if (html5Qrcode.current) {
        const state = html5Qrcode.current?.getState()
        if (state === Html5QrcodeScannerState.PAUSED) {
          html5Qrcode.current?.resume()
        }
      }
    }, waitPeriod)
  }, [waitPeriod])
  const pause = useCallback(() => {
    const state = html5Qrcode.current?.getState()
    if (state === Html5QrcodeScannerState.SCANNING) {
      html5Qrcode.current?.pause(true)
    }
  }, [])

  const innerRef = useRef<IHtmlQrcodePluginForwardedRef>({
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
    // prevent double initializing of scanner caused by (React.StrictMode)[https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects]
    if (!html5Qrcode.current || initiatedStates.includes(html5Qrcode.current?.getState())) {
      html5Qrcode.current = new Html5Qrcode(qrcodeRegionId)
      html5Qrcode.current
        .start(cameraId, config, onCodeScanned, () => {
          // nothing scanned
        })
        .then(() => {
          // camera started
        })
        .catch(() => {
          // camera start failed
        })
    }
    return () => {
      if (html5Qrcode.current && initiatedStates.includes(html5Qrcode.current?.getState())) {
        html5Qrcode.current
          ?.stop()
          .then(() => {
            // camera stopped
          })
          .catch(() => {
            // camera failed to stop
          })
      }
    }
  }, [
    onCodeScanned,
    qrcodeRegionId,
    verbose
  ])
  return <div id={qrcodeRegionId} className={className}/>
})

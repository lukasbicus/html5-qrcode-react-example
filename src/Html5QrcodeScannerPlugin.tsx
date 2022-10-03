import {
  Html5QrcodeScanner,
  Html5QrcodeScannerState,
  Html5QrcodeSupportedFormats
} from 'html5-qrcode'
import {Html5QrcodeScanType, QrDimensions} from 'html5-qrcode/esm/core'
import React, {forwardRef, useCallback, useEffect, useRef} from 'react'

interface IHtml5QrcodeScannerPluginProps {
  qrbox: number | QrDimensions | undefined
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
    qrbox,
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
    const config = {
      fps: 4,
      qrbox,
      formatsToSupport: [
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.QR_CODE
      ],
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    }
    html5QrcodeScanner.current = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    )
    html5QrcodeScanner.current?.render(onCodeScanned, () => {
      // nothing scanned
    })
    return () => {
      html5QrcodeScanner.current?.clear().catch((e) => {
        // eslint-disable-next-line no-console
        console.error('Failed to clear html5QrcodeScanner. ', e)
      })
    }
  }, [onCodeScanned, qrbox, qrcodeRegionId, verbose])
  return <div id={qrcodeRegionId} className={className}/>
})

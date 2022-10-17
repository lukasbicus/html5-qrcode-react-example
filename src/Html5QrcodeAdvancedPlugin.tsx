import {
  Html5Qrcode,
  Html5QrcodeScannerState
} from 'html5-qrcode'
import React, {forwardRef, useCallback, useEffect, useRef} from 'react'
import {Html5QrcodeScannerConfig} from "./types";

enum PluginState {
  Initial = 'initial',
  Starting = 'starting',
  Started = 'started',
  StartingFailed = 'startingFailed',
  StoppingFailed = 'stoppingFailed'
}

interface IHtmlQrcodeAdvancedPluginProps {
  config: Html5QrcodeScannerConfig
  cameraId: string
  onCodeScanned: (code: string) => void
  qrcodeRegionId: string
  waitPeriod?: number
  className?: string
}

export interface IHtmlQrcodePluginForwardedRef {
  pause: () => void
  resume: () => void
}

export const HtmlQrcodeAdvancedPlugin = forwardRef<IHtmlQrcodePluginForwardedRef,
  IHtmlQrcodeAdvancedPluginProps>(function HtmlQrcodePluginComp(
  {
    config,
    qrcodeRegionId,
    cameraId,
    onCodeScanned,
    waitPeriod = 750,
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
    if (!html5Qrcode.current) {
      html5Qrcode.current = new Html5Qrcode(qrcodeRegionId)
    }
    const prevQrcodeRegionId = qrcodeRegionId
    return () => {
      if (html5Qrcode.current && prevQrcodeRegionId !== qrcodeRegionId) {
        // stopping due changed qrcodeRegionId
        html5Qrcode.current?.stop()
          .then(() => {
            // camera stopped
          })
          .catch(() => {
            // camera failed to stop
          })
      }
    }
  }, [qrcodeRegionId])

  const pluginStateRef = useRef<PluginState>(PluginState.Initial)

  useEffect(() => {
    if (html5Qrcode.current && pluginStateRef.current !== PluginState.Starting) {
      pluginStateRef.current = PluginState.Starting
      html5Qrcode.current
        .start(cameraId, config, onCodeScanned, () => {
          // nothing scanned
        })
        .then(() => {
          // camera started
          pluginStateRef.current = PluginState.Started
        })
        .catch(() => {
          // camera start failed
          pluginStateRef.current = PluginState.StartingFailed
        })
    }
    return () => {
      if (html5Qrcode.current && pluginStateRef.current !== PluginState.Starting) {
        html5Qrcode.current
          ?.stop()
          .then(() => {
            // camera stopped
            pluginStateRef.current = PluginState.Initial
          })
          .catch(() => {
            // camera failed to stop
            pluginStateRef.current = PluginState.StoppingFailed
          })
      }
    }
  }, [cameraId, config, onCodeScanned])
  return <div id={qrcodeRegionId} className={className}/>
})

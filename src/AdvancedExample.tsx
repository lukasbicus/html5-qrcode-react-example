import {Html5QrcodeSupportedFormats} from "html5-qrcode";
import {Html5QrcodeScanType} from "html5-qrcode/esm/core";
import React, {useRef, useState} from 'react'
import {useFetchCameras} from "./useFetchCameras";
import {HtmlQrcodeAdvancedPlugin, IHtmlQrcodePluginForwardedRef} from "./Html5QrcodeAdvancedPlugin";

interface IInfoProps {
  title: string
}

export const Info: React.FC<IInfoProps> = ({title}: IInfoProps) => (
  <div>
    <h6>{title}</h6>
  </div>
)

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

const QRCODE_REGION = 'ADVANCED_EXAMPLE_QRCODE_REGION'

interface IAdvancedExampleProps {
  onCodeScanned: (code: string) => void
}

export const AdvancedExample: React.FC<IAdvancedExampleProps> = ({onCodeScanned}: IAdvancedExampleProps) => {
  const {state: {loading, error, cameraDevices}} = useFetchCameras()
  const ref = useRef<IHtmlQrcodePluginForwardedRef>(null)
  const [selectedCameraId, setSelectedCameraId] = useState<string | undefined>(undefined)
  if (loading) {
    return <Info title="Detecting available cameras"/>
  }
  if (error) {
    return <Info title="Failed to detect cameras"/>
  }
  if (cameraDevices.length === 0) {
    return <Info title="No available cameras"/>
  }
  return (
    <div>
      <HtmlQrcodeAdvancedPlugin
        ref={ref}
        config={CONFIG}
        onCodeScanned={onCodeScanned}
        qrcodeRegionId={QRCODE_REGION}
        cameraId={selectedCameraId || cameraDevices[0].id}
      />
      <button onClick={() => {
        if (ref.current) {
          ref.current.pause()
        }
      }}>
        Pause
      </button>
      <button onClick={() => {
        if (ref.current) {
          ref.current.resume()
        }
      }}
      >
        Resume
      </button>
      {(cameraDevices.length > 1) && (
        <select
          defaultValue={cameraDevices[0].id}
          onChange={(event) => {
            setSelectedCameraId(event.target.value)
          }}
        >
          {cameraDevices.map(device => (
            <option key={device.id} value={device.id} label={device.label}/>
          ))}
        </select>
      )}
    </div>
  )
}

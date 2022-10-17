import {Html5QrcodeSupportedFormats} from "html5-qrcode";
import {Html5QrcodeScanType} from "html5-qrcode/esm/core";
import React from 'react'
import {useFetchCameras} from "./useFetchCameras";
import {HtmlQrcodeAdvancedPlugin} from "./Html5QrcodeAdvancedPlugin";

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
    <HtmlQrcodeAdvancedPlugin
      config={CONFIG}
      onCodeScanned={onCodeScanned}
      qrcodeRegionId={QRCODE_REGION}
      cameraId={cameraDevices[0].id}
    />
  )
}

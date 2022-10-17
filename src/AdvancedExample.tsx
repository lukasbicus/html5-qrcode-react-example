import {Html5QrcodeSupportedFormats} from "html5-qrcode";
import {Html5QrcodeScanType} from "html5-qrcode/esm/core";
import React from 'react'
import {useFetchCameras} from "./useFetchCameras";

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

export const AdvancedExample: React.FC = () => {
  const {state: {loading, error, cameraDevices}} = useFetchCameras()
  if (loading) {
    return <div>
      <h6>
        Detecting available cameras
      </h6>
    </div>
  }
  if (error) {
    return (<div><h6>Failed to detect cameras</h6></div>)
  }
  if (cameraDevices.length === 0) {
    return <div><h6>No available cameras</h6></div>
  }
  return (
    <div>Camera id: {cameraDevices[0].id}</div>
  )
}

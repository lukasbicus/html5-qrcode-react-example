import {Html5Qrcode} from 'html5-qrcode'
import {CameraDevice} from 'html5-qrcode/esm/core'
import {useCallback, useState} from 'react'

interface IFetchCameras {
  loading: boolean
  error?: Error
  cameraDevices: CameraDevice[]
}
const defaultState: IFetchCameras = {
  loading: false,
  cameraDevices: []
}

export const useFetchCameras = () => {
  const [state, setState] = useState<IFetchCameras>(defaultState)
  const fetchCameras = useCallback(async () => {
    try {
      if (!state.loading) {
        setState((prevState) => ({...prevState, loading: true}))
        const result = await Html5Qrcode.getCameras()
        setState({
          loading: false,
          cameraDevices: result
        })
      }
    } catch (error) {
      setState({
        loading: false,
        error: new Error('Not permitted'),
        cameraDevices: []
      })
    }
  }, [state.loading])

  return {state, fetchCameras}
}

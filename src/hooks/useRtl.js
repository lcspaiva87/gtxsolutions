import { handleRtl } from '@/store/layoutReducer'
import { useDispatch, useSelector } from 'react-redux'

const useRtl = () => {
  const dispatch = useDispatch()
  const isRtl = useSelector((state) => state.layout.isRTL)

  const setRtl = (val) => dispatch(handleRtl(val))

  return [isRtl, setRtl]
}

export default useRtl

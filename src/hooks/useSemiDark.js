import { handleSemiDarkMode } from '@/store/layoutReducer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useSemiDark = () => {
  const dispatch = useDispatch()
  const isSemiDark = useSelector((state) => state.layout.semiDarkMode)
  const setSemiDark = (val) => {
    dispatch(handleSemiDarkMode(val))
    localStorage.setItem('semiDarkMode', JSON.stringify(val))
  }
  useEffect(() => {
    const storedMode = localStorage.getItem('semiDarkMode')
    if (storedMode !== null) {
      dispatch(handleSemiDarkMode(JSON.parse(storedMode)))
    }
  }, [])

  return [isSemiDark, setSemiDark]
}

export default useSemiDark

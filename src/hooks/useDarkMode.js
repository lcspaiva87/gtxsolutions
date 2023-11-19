import { handleDarkMode } from '@/store/layoutReducer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useDarkmode = () => {
  const dispatch = useDispatch()
  const isDark = useSelector((state) => state.layout.darkMode)

  const setDarkMode = (mode) => {
    dispatch(handleDarkMode(mode))
    localStorage.setItem('darkMode', JSON.stringify(mode))
  }

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode')
    if (storedDarkMode !== null) {
      dispatch(handleDarkMode(JSON.parse(storedDarkMode)))
    }
  }, [])

  return [isDark, setDarkMode]
}

export default useDarkmode

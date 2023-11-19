import { handleSkin } from '@/store/layoutReducer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useSkin = () => {
  const dispatch = useDispatch()
  const skin = useSelector((state) => state.layout.skin)

  const setSkin = (mode) => {
    dispatch(handleSkin(mode))
    localStorage.setItem('skin', JSON.stringify(mode))
  }
  useEffect(() => {
    const storedMode = localStorage.getItem('skin')
    if (storedMode !== null) {
      dispatch(handleSkin(JSON.parse(storedMode)))
    }
  }, [])
  return [skin, setSkin]
}

export default useSkin

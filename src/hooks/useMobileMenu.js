import { handleMobileMenu } from '@/store/layoutReducer'
import { useDispatch, useSelector } from 'react-redux'

const useMobileMenu = () => {
  const dispatch = useDispatch()
  const mobileMenu = useSelector((state) => state.layout.mobileMenu)

  // ** Toggles Mobile Menu
  const setMobileMenu = (val) => dispatch(handleMobileMenu(val))

  return [mobileMenu, setMobileMenu]
}

export default useMobileMenu

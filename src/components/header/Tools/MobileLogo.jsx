import useDarkMode from '@/hooks/useDarkMode'
import Link from 'next/link'
import React from 'react'

import LogoWhite from '@/assets/images/logo/logo-white.svg'
import MainLogo from '@/assets/images/logo/logo.svg'
const MobileLogo = () => {
  const [isDark] = useDarkMode()
  return (
    <Link href="/analytics">
      <img src={isDark ? LogoWhite : MainLogo} alt="" />
    </Link>
  )
}

export default MobileLogo

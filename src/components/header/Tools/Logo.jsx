'use client'

import useDarkMode from '@/hooks/useDarkMode'
import useWidth from '@/hooks/useWidth'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  const [isDark] = useDarkMode()
  const { width, breakpoints } = useWidth()

  return (
    <div>
      <Link href="/analytics">
        <React.Fragment>
          {width >= breakpoints.xl ? (
            <img
              src={
                isDark
                  ? '/assets/images/logo/logo-white.svg'
                  : '/assets/images/logo/logo.svg'
              }
              alt=""
            />
          ) : (
            <img
              src={
                isDark
                  ? '/assets/images/logo/logo-c-white.svg'
                  : '/assets/images/logo/logo-c.svg'
              }
              alt=""
            />
          )}
        </React.Fragment>
      </Link>
    </div>
  )
}

export default Logo

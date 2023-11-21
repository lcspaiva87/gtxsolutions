import { QueryProvider } from '@/utils/QueryClientProvider'
import { SnackbarProvider } from '@/utils/QueryProvider'
import { ReduxProvider } from '@/utils/provider'
import "flatpickr/dist/themes/light.css"
import "leaflet/dist/leaflet.css"

import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'simplebar-react/dist/simplebar.min.css'

import './scss/app.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: 'GTX | %s ',
    default: 'GTX',
  },
  icons: [
    {
      url: '/favicon.svg',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SnackbarProvider>
          <QueryProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </QueryProvider>
        </SnackbarProvider>
      </body>
    </html>
  )
}

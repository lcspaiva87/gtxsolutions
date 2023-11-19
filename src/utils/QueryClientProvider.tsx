'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
export type ProviderProps = {
  children: React.ReactNode
}

export const QueryProvider = ({ children }: ProviderProps) => {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    </>
  )
}

"use client"
import { SnackbarProvider as Snackbar } from 'notistack';
import React from 'react'
export type ProviderProps = {
  children: React.ReactNode
}

export const SnackbarProvider = ({ children }:ProviderProps) => {
  return (
      <Snackbar>
        {children}
      </Snackbar>
  )
}

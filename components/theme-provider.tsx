'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // Handle color theme
  React.useEffect(() => {
    setMounted(true)
    
    // Get saved color theme from localStorage
    try {
      if (typeof window !== 'undefined') {
        const savedColorTheme = localStorage.getItem('color-theme')
        if (savedColorTheme) {
          document.documentElement.setAttribute('data-theme', savedColorTheme)
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
    }
  }, [])

  // Avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

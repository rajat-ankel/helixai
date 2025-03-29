'use client'

import * as React from 'react'
import { colorThemes } from '@/lib/theme-colors'

// Context for color theme
export const ColorThemeContext = React.createContext({
  colorTheme: 'default',
  setColorTheme: (theme: string) => {}
})

// Provider component for color theme
export function ColorThemeProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [colorTheme, setColorThemeState] = React.useState('default')
  const [mounted, setMounted] = React.useState(false)

  // Set the color theme
  const setColorTheme = React.useCallback((theme: string) => {
    if (typeof window !== 'undefined' && mounted) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('color-theme', theme)
      setColorThemeState(theme)
    }
  }, [mounted])

  // Initialize on mount
  React.useEffect(() => {
    setMounted(true)
    
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('color-theme') || 'default'
    
    // Apply the theme
    document.documentElement.setAttribute('data-theme', savedTheme)
    setColorThemeState(savedTheme)
    
    return () => {
      // Cleanup
      setMounted(false)
    }
  }, [])

  const contextValue = React.useMemo(() => ({
    colorTheme,
    setColorTheme
  }), [colorTheme, setColorTheme])

  return (
    <ColorThemeContext.Provider value={contextValue}>
      {children}
    </ColorThemeContext.Provider>
  )
}

// Hook to use color theme
export function useColorTheme() {
  const context = React.useContext(ColorThemeContext)
  if (context === undefined) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider')
  }
  return context
}

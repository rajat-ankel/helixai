'use client'

import * as React from 'react'
import { Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

// Theme options
const themes = [
  { name: 'Default', value: 'default', color: 'hsl(0, 0%, 9%)' },
  { name: 'Blue', value: 'blue', color: 'hsl(210, 100%, 50%)' },
  { name: 'Green', value: 'green', color: 'hsl(142, 70%, 45%)' },
  { name: 'Purple', value: 'purple', color: 'hsl(262, 70%, 50%)' },
  { name: 'Orange', value: 'orange', color: 'hsl(24, 95%, 53%)' },
  { name: 'Pink', value: 'pink', color: 'hsl(330, 90%, 55%)' }
]

export function ThemeColorToggle() {
  const [currentTheme, setCurrentTheme] = React.useState('default')
  const [mounted, setMounted] = React.useState(false)

  // Initialize on mount
  React.useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('color-theme') || 'default'
    setCurrentTheme(savedTheme)
  }, [])

  // Function to set the color theme
  const setColorTheme = React.useCallback((theme: string) => {
    // Remove current theme
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }
    
    // Save to localStorage
    localStorage.setItem('color-theme', theme)
    setCurrentTheme(theme)
  }, [])

  // Avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle color theme</span>
          <span
            className="absolute bottom-1 right-1 h-2 w-2 rounded-full"
            style={{
              backgroundColor: themes.find(t => t.value === currentTheme)?.color || themes[0].color
            }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setColorTheme(theme.value)}
            className="flex items-center gap-2"
          >
            <span
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: theme.color }}
            />
            {theme.name}
            {currentTheme === theme.value && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

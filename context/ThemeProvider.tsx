import { theme } from '@/constants/theme'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

export type ThemeType = keyof typeof theme
export type Theme = typeof theme.light

interface ThemeContextProps {
  theme: Theme
  colorScheme: ThemeType
  setColorScheme: (scheme: ThemeType) => void
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorScheme] = useState<ThemeType>('light')

  const themeObj = useMemo(() => theme[colorScheme], [colorScheme])

  return (
    <ThemeContext.Provider value={{ theme: themeObj, colorScheme, setColorScheme }}>{children}</ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

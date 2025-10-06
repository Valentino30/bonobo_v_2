import type { Theme } from '@/context/ThemeProvider'
import { StyleSheet } from 'react-native'

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      backgroundColor: theme.primary,
    },
    text: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  })

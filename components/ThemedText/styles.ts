import type { Theme } from '@/context/ThemeProvider'
import { StyleSheet } from 'react-native'

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    default: {
      fontSize: 16,
      lineHeight: 24,
    },
    title: {
      fontSize: 32,
      lineHeight: 32,
    },
    subtitle: {
      fontSize: 20,
    },
    button: {
      fontSize: 18,
      color: theme.buttonText,
      fontFamily: 'Nunito_700Bold',
    },
    link: {
      lineHeight: 30,
      fontSize: 16,
    },
  })

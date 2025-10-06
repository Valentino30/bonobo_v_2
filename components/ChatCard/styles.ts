import type { Theme } from '@/context/ThemeProvider'
import { StyleSheet } from 'react-native'

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.card,
      padding: 20,
      borderRadius: 10,
      marginBottom: 15,
      borderWidth: 2,
      borderColor: theme.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: theme.text,
    },
    subtitle: {
      fontSize: 14,
      color: theme.muted,
      marginBottom: 10,
    },
    newFileTag: {
      color: theme.accent,
      fontWeight: 'bold',
    },
    date: {
      fontSize: 12,
      color: theme.muted,
    },
    button: {
      marginTop: 10,
      backgroundColor: theme.primary,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: theme.buttonText,
      fontWeight: 'bold',
    },
  })

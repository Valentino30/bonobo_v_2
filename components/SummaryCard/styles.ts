import { StyleSheet } from 'react-native'

export const getStyles = (theme: any) =>
  StyleSheet.create({
    summaryCard: {
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 4,
      backgroundColor: theme?.colors?.card ?? '#fff',
      borderRadius: 12,
      padding: 12,
      elevation: 1,
    },
    summaryTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme?.colors?.primary ?? '#2E6A3E',
    },
    summaryLabel: {
      fontSize: 14,
      color: theme?.colors?.textSecondary ?? '#555',
      marginTop: 4,
      textAlign: 'center',
    },
  })

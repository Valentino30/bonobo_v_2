import { StyleSheet } from 'react-native'

export const getStyles = (theme: any) =>
  StyleSheet.create({
    barRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    senderLabel: {
      width: 110,
      fontWeight: '600',
      color: theme?.colors?.primary ?? '#2E6A3E',
      marginBottom: 4,
    },
    barContainer: {
      flex: 1,
      height: 12,
      backgroundColor: theme?.colors?.backgroundSecondary ?? '#E0E0E0',
      borderRadius: 6,
      marginHorizontal: 8,
      overflow: 'hidden',
    },
    bar: {
      height: 12,
      backgroundColor: theme?.colors?.success ?? '#7CB77B',
      borderRadius: 6,
    },
    barValue: {
      width: 80,
      fontSize: 13,
      color: theme?.colors?.textSecondary ?? '#555',
      marginTop: 4,
    },
  })

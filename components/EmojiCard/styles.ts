import { StyleSheet } from 'react-native'

export const getStyles = (theme: any) =>
  StyleSheet.create({
    emojiRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    senderLabel: {
      width: 110,
      fontWeight: '600',
      color: theme?.colors?.primary ?? '#2E6A3E',
    },
    emojiList: {
      marginLeft: 8,
      fontSize: 18,
      color: theme?.colors?.text ?? '#222',
    },
  })

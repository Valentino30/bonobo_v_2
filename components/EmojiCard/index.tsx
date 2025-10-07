import { useTheme } from '@/hooks/useTheme'
import { View } from 'react-native'
import ThemedText from '../ThemedText'
import { getStyles } from './styles'

export default function EmojiCard({ sender, emojis }: { sender: string; emojis: string[] }) {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  return (
    <View style={styles.emojiRow}>
      <ThemedText style={styles.senderLabel}>{sender}</ThemedText>
      <ThemedText style={styles.emojiList}>{emojis?.join(' ')}</ThemedText>
    </View>
  )
}

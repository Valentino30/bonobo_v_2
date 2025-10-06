import { useTheme } from '@/context/ThemeProvider'
import { IChat } from '@/types/chat'
import { Text, TouchableOpacity, View } from 'react-native'
import { getStyles } from './styles'

interface ChatCardProps {
  chat: IChat
  onPress: () => void
}

export function ChatCard({ chat, onPress }: ChatCardProps) {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{chat.name}</Text>
      <Text style={styles.subtitle}>
        {chat.status}
        {chat.isNew && <Text style={styles.newFileTag}> (New File Received)</Text>}
      </Text>
      {chat.isNew && (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Analyze Chat</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

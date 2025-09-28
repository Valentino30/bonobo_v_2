import { IChat } from '@/types/chat'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

interface ChatCardProps {
  chat: IChat
  onPress: () => void
}

const ChatCard: React.FC<ChatCardProps> = ({ chat, onPress }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{chat.name}</Text>
    <Text style={styles.subtitle}>
      {chat.status}
      {chat.isNew && <Text style={styles.newFileTag}> (New File Received)</Text>}
    </Text>
    <Text style={styles.date}>Last Import: {chat.lastImport}</Text>
    {/* The button is only shown for the newly imported chat */}
    {chat.isNew && (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Process File</Text>
      </TouchableOpacity>
    )}
  </View>
)

export default ChatCard

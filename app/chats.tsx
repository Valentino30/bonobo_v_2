import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { router, useLocalSearchParams } from 'expo-router'
import { Button, StyleSheet } from 'react-native'

export default function ChatsScreen() {
  const { chat } = useLocalSearchParams<{ chat?: string }>()
  const chatData = chat ? JSON.parse(chat) : null

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>My Chats</ThemedText>
      {chatData ? (
        <ThemedView style={styles.chatContainer}>
          <ThemedText style={styles.chatName}>{chatData.chatName}</ThemedText>
          <ThemedText style={styles.messageCount}>Total Messages: {chatData.messageCount}</ThemedText>
          <Button
            title="Analyze Chat"
            onPress={() => {
              router.push({
                pathname: '/chat-analysis',
                params: { chat: JSON.stringify(chatData) },
              })
            }}
          />
        </ThemedView>
      ) : (
        <ThemedText>No chats imported yet.</ThemedText>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chatContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#373737',
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageCount: {
    fontSize: 16,
    marginBottom: 8,
  },
})

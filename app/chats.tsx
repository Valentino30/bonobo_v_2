import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { router, useLocalSearchParams } from 'expo-router'
import { Button, StyleSheet, View } from 'react-native'

export default function ChatsScreen() {
  const { chat } = useLocalSearchParams<{ chat?: string }>()
  const chatData = chat ? JSON.parse(chat) : null

  const handleImportChat = () => {
    router.push('/select-device')
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.contentContainer}>
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
      </View>

      <View style={styles.importButtonContainer}>
        <Button title="Import WhatsApp chat" onPress={handleImportChat} />
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  chatContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#373737',
    marginBottom: 16,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageCount: {
    fontSize: 16,
    marginBottom: 8,
  },
  importButtonContainer: {
    paddingVertical: 30,
    paddingHorizontal: 0,
    marginBottom: 0,
  },
})

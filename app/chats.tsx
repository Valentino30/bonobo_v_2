import { ThemedButton, ThemedText, ThemedView } from '@/components'
import { ChatCard } from '@/components/ChatCard'
import { router, useLocalSearchParams } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function ChatsScreen() {
  const { chat } = useLocalSearchParams<{ chat?: string }>()
  const chatData = chat ? JSON.parse(chat) : null

  const handleImportChat = () => {
    router.push('/select-device')
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.contentContainer}>
        {chatData ? (
          <ChatCard
            chat={{
              id: chatData.id || 'imported',
              name: chatData.chatName,
              status: `Total Messages: ${chatData.messageCount}`,
              isNew: true,
              lastImport: chatData.lastImport || '',
            }}
            onPress={() => {
              router.push({
                pathname: '/chat-analysis',
                params: { chat: JSON.stringify(chatData) },
              })
            }}
          />
        ) : (
          <ThemedText>No chats imported yet.</ThemedText>
        )}
      </View>

      <View style={styles.importButtonContainer}>
        <ThemedButton title="Import WhatsApp chat" onPress={handleImportChat} />
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
  chatContainer: {
    padding: 16,
    borderRadius: 8,
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

import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { router, useLocalSearchParams } from 'expo-router'
import { Button, StyleSheet } from 'react-native'

export default function ChatsScreen() {
  const { importedChatName, importedMessageCount, fileUri, sender1, sender1Count, sender2, sender2Count } =
    useLocalSearchParams<{
      importedChatName?: string
      importedMessageCount?: string
      fileUri?: string
      sender1?: string
      sender1Count?: string
      sender2?: string
      sender2Count?: string
    }>()

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Chats</ThemedText>
      {importedChatName && importedMessageCount ? (
        <ThemedView style={styles.chatContainer}>
          <ThemedText style={styles.chatName}>{importedChatName}</ThemedText>
          <ThemedText style={styles.messageCount}>Total Messages: {importedMessageCount}</ThemedText>
          <Button
            title="Analyze Chat"
            onPress={() => {
              router.push({
                pathname: '/chat-analysis',
                params: {
                  chatName: importedChatName,
                  messageCount: importedMessageCount,
                  sender1,
                  sender1Count,
                  sender2,
                  sender2Count,
                },
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
    backgroundColor: '#f0f0f0',
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

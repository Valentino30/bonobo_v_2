import { ThemedButton, ThemedText, ThemedView } from '@/components'
import { ChatAnalysisData } from '@/types/chat'
import { router, useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native'

export default function ChatAnalysisScreen() {
  const { chat } = useLocalSearchParams<{ chat?: string }>()

  const chatData: ChatAnalysisData | null = chat ? JSON.parse(chat) : null

  if (!chatData) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Error</ThemedText>
        <ThemedText>No chat data provided for analysis.</ThemedText>
        <ThemedButton title="Go Back" onPress={() => router.back()} />
      </ThemedView>
    )
  }

  const { messageCount, sender1, sender1Count, sender2, sender2Count } = chatData

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.stat}>Total Messages: {messageCount}</ThemedText>
      <ThemedText style={styles.stat}>
        Messages by {sender1}: {sender1Count}
      </ThemedText>
      <ThemedText style={styles.stat}>
        Messages by {sender2}: {sender2Count}
      </ThemedText>

      <ThemedButton
        title="Analyze with AI"
        onPress={() => {
          router.push({
            pathname: '/ai-analysis',
            params: { chat: JSON.stringify(chatData) },
          })
        }}
      />
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
  stat: {
    fontSize: 18,
    marginBottom: 8,
  },
})

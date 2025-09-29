import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { router, useLocalSearchParams } from 'expo-router'
import { Button, StyleSheet } from 'react-native'

export default function ChatAnalysisScreen() {
  const { chatName, messageCount, sender1, sender1Count, sender2, sender2Count, messagesBySender1, messagesBySender2 } =
    useLocalSearchParams<{
      chatName: string
      messageCount: string
      sender1: string
      sender1Count: string
      sender2: string
      sender2Count: string
      messagesBySender1: string
      messagesBySender2: string
    }>()

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Chat Analysis: {chatName}</ThemedText>
      <ThemedText style={styles.stat}>Total Messages: {messageCount}</ThemedText>
      <ThemedText style={styles.stat}>
        Messages by {sender1}: {sender1Count}
      </ThemedText>
      <ThemedText style={styles.stat}>
        Messages by {sender2}: {sender2Count}
      </ThemedText>
      <Button
        title="Get AI Relationship Analysis"
        onPress={() => {
          router.push({
            pathname: '/ai-analysis',
            params: {
              chatName,
              messagesBySender1,
              messagesBySender2,
            },
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

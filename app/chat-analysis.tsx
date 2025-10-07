import { EmojiCard, StatBarCard, SummaryCard, ThemedButton, ThemedText, ThemedView } from '@/components'
import { ChatAnalysisData } from '@/types/chat'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

export default function ChatAnalysisScreen() {
  const { chat } = useLocalSearchParams<{ chat?: string }>()
  const [chatData, setChatData] = useState<ChatAnalysisData | null>(null)

  useEffect(() => {
    if (chat) {
      setChatData(JSON.parse(chat))
    }
  }, [chat])

  if (!chatData) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Error</ThemedText>
        <ThemedText>No chat data provided for analysis.</ThemedText>
        <ThemedButton title="Go Back" onPress={() => router.back()} />
      </ThemedView>
    )
  }

  // Only destructure fields that exist for sure
  const { messageCount = 0, sender1 = '', sender1Count = 0, sender2 = '', sender2Count = 0 } = chatData

  // Use optional chaining and fallback values for all other fields
  const avgLength1 = (chatData as any).avgLength1 ?? 0
  const avgLength2 = (chatData as any).avgLength2 ?? 0
  const messagesPerDay1 = (chatData as any).messagesPerDay1 ?? 0
  const messagesPerDay2 = (chatData as any).messagesPerDay2 ?? 0
  const emojiUsage1 = (chatData as any).emojiUsage1 ?? []
  const emojiUsage2 = (chatData as any).emojiUsage2 ?? []
  const avgResponseTime1 = (chatData as any).avgResponseTime1 ?? 0
  const avgResponseTime2 = (chatData as any).avgResponseTime2 ?? 0

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Summary Section */}
        <View style={styles.summaryRow}>
          <SummaryCard value={messageCount} label="Total Messages" />
          <SummaryCard value={sender1Count} label={`Messages by ${sender1}`} />
          <SummaryCard value={sender2Count} label={`Messages by ${sender2}`} />
        </View>

        {/* Average Response Time */}
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>Average Response Time</ThemedText>
          <StatBarCard
            sender={sender1}
            value={avgResponseTime1}
            max={Math.max(avgResponseTime1, avgResponseTime2)}
            valueLabel={`${avgResponseTime1}h`}
          />
          <StatBarCard
            sender={sender2}
            value={avgResponseTime2}
            max={Math.max(avgResponseTime1, avgResponseTime2)}
            valueLabel={`${avgResponseTime2}h`}
          />
        </View>

        {/* Average Message Length */}
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>Average Message Length</ThemedText>
          <StatBarCard
            sender={sender1}
            value={avgLength1}
            max={Math.max(avgLength1, avgLength2)}
            valueLabel={`${avgLength1} characters`}
          />
          <StatBarCard
            sender={sender2}
            value={avgLength2}
            max={Math.max(avgLength1, avgLength2)}
            valueLabel={`${avgLength2} characters`}
          />
        </View>

        {/* Messages Per Day */}
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>Messages Per Day</ThemedText>
          <StatBarCard
            sender={sender1}
            value={messagesPerDay1}
            max={Math.max(messagesPerDay1, messagesPerDay2)}
            valueLabel={`${messagesPerDay1} messages/day`}
          />
          <StatBarCard
            sender={sender2}
            value={messagesPerDay2}
            max={Math.max(messagesPerDay1, messagesPerDay2)}
            valueLabel={`${messagesPerDay2} messages/day`}
          />
        </View>

        {/* Emoji Usage */}
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>Emoji Usage</ThemedText>
          <EmojiCard sender={sender1} emojis={emojiUsage1} />
          <EmojiCard sender={sender2} emojis={emojiUsage2} />
        </View>
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAF8',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2E6A3E',
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2E6A3E',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  senderLabel: {
    width: 110,
    fontWeight: '600',
    color: '#2E6A3E',
  },
  barContainer: {
    flex: 1,
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  bar: {
    height: 12,
    backgroundColor: '#7CB77B',
    borderRadius: 6,
  },
  barValue: {
    width: 80,
    fontSize: 13,
    color: '#555',
  },
  emojiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emojiList: {
    marginLeft: 8,
    fontSize: 18,
  },
})

import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { ChatAnalysisData } from '@/types/chat'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo, useRef, useState } from 'react' // Import useMemo
import { ScrollView, StyleSheet } from 'react-native'
import { getAnalysis } from '../utils/getAnalysis'

export default function AIAnalysisScreen() {
  const { chat } = useLocalSearchParams<{ chat?: string }>()
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(true)
  const providerIndexRef = useRef(0)

  const chatData: ChatAnalysisData | null = useMemo(() => {
    return chat ? JSON.parse(chat) : null
  }, [chat])

  const MAX_MESSAGES = 100

  useEffect(() => {
    if (!chatData) {
      setAnalysis('Error: Chat data is missing or invalid.')
      setLoading(false)
      return
    }

    const { chatName, messagesBySender1, messagesBySender2 } = chatData

    const fetchAnalysis = async () => {
      try {
        setLoading(true)

        const parsedMessages1 = messagesBySender1 ? JSON.parse(messagesBySender1) : []
        const parsedMessages2 = messagesBySender2 ? JSON.parse(messagesBySender2) : []

        const limitedMessages1 = parsedMessages1.slice(0, MAX_MESSAGES)
        const limitedMessages2 = parsedMessages2.slice(0, MAX_MESSAGES)

        const result = await getAnalysis(chatName, limitedMessages1, limitedMessages2, providerIndexRef)
        setAnalysis(result)
        providerIndexRef.current = 0
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        setAnalysis(`Error getting analysis: ${errorMessage}`)
        console.error('Error in fetchAnalysis:', errorMessage, error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [chatData])

  const titleText = chatData?.chatName ? `AI Analysis for: ${chatData.chatName}` : 'AI Relationship Analysis'

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>{titleText}</ThemedText>
      {loading ? (
        <ThemedText style={styles.loading}>Loading...</ThemedText>
      ) : (
        <ScrollView style={styles.analysisContainer} contentContainerStyle={styles.contentContainer}>
          <ThemedText style={styles.analysis}>{analysis}</ThemedText>
        </ScrollView>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  loading: {
    fontSize: 16,
    padding: 16,
  },
  analysisContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  analysis: {
    fontSize: 16,
    lineHeight: 24,
  },
})

import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { getAnalysis } from '../utils/getAnalysis'

export default function AIAnalysisScreen() {
  const { chatName, messagesBySender1, messagesBySender2 } = useLocalSearchParams<{
    chatName: string
    messagesBySender1: string
    messagesBySender2: string
  }>()

  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(true)
  const providerIndexRef = useRef(0)
  const MAX_MESSAGES = 100

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true)
        const parsedMessages1 = messagesBySender1 ? JSON.parse(messagesBySender1) : []
        const parsedMessages2 = messagesBySender2 ? JSON.parse(messagesBySender2) : []
        const limitedMessages1 = parsedMessages1.slice(0, MAX_MESSAGES)
        const limitedMessages2 = parsedMessages2.slice(0, MAX_MESSAGES)
        console.log('Sender 1 messages:', limitedMessages1.length, 'Sample:', limitedMessages1.slice(0, 2))
        console.log('Sender 2 messages:', limitedMessages2.length, 'Sample:', limitedMessages2.slice(0, 2))
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
  }, [chatName, messagesBySender1, messagesBySender2])

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>AI Relationship Analysis</ThemedText>
      {loading ? (
        <ThemedText style={styles.loading}>Loading...</ThemedText>
      ) : (
        <ScrollView style={styles.analysisContainer} contentContainerStyle={styles.contentContainer}>
          <ThemedText style={styles.analysis}>{analysis}</ThemedText>
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

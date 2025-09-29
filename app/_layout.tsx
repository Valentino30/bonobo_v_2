import { useColorScheme } from '@/hooks/use-color-scheme'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack, router } from 'expo-router'
import { useShareIntent } from 'expo-share-intent'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { ChatData } from '../types/chat'
import { parseChatFile } from '../utils/parseChatFile'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent()

  useEffect(() => {
    const handleShareIntent = async () => {
      if (hasShareIntent && shareIntent) {
        if (shareIntent.files && shareIntent.files.length > 0) {
          const sharedFile = shareIntent.files[0]
          const fileUri = sharedFile.path
          const mimeType = sharedFile.mimeType

          // Validate file type
          if (!mimeType.includes('zip')) {
            console.log('Invalid file type, expected a .zip file')
            resetShareIntent()
            return
          }

          console.log('--- STARTING IN-LAYOUT FILE PROCESSING ---')
          try {
            // 1. Parse the WhatsApp chat file
            const chatData: ChatData = await parseChatFile(fileUri)

            // 2. Redirect to chat analysis screen with parsed data
            router.replace({
              pathname: '/chat-analysis',
              params: {
                fileUri,
                chatName: chatData.chatName,
                messageCount: chatData.messageCount,
                sender1: chatData.senders[0] || '',
                sender1Count: chatData.senderCounts[chatData.senders[0]]?.toString() || '0',
                sender2: chatData.senders[1] || '',
                sender2Count: chatData.senderCounts[chatData.senders[1]]?.toString() || '0',
              },
            })
            resetShareIntent()
          } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            console.error('Error handling shared file:', errorMessage)
            resetShareIntent()
          }
        } else if (shareIntent.webUrl) {
          console.log('Shared URL (Plain):', shareIntent.webUrl)
          resetShareIntent()
        }
      }
    }

    handleShareIntent()
  }, [hasShareIntent, shareIntent, resetShareIntent])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="chats" options={{ headerShown: true, title: 'My Chats' }} />
        <Stack.Screen name="chat-analysis" options={{ headerShown: true, title: 'Chat Analysis' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}

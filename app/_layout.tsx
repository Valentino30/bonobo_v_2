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
            const { chatName, messageCount }: ChatData = await parseChatFile(fileUri)

            // 2. Redirect with parsed data
            router.replace({
              pathname: '/chats',
              params: {
                fileUri,
                importedChatName: chatName,
                importedMessageCount: messageCount,
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
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}

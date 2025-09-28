import { useColorScheme } from '@/hooks/use-color-scheme'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack, router } from 'expo-router' // Import router
import { useShareIntent } from 'expo-share-intent'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

// --- SIMULATED PARSING FUNCTION ---
// In a real app, this would use expo-file-system and a zip library.
const parseChatFile = async (uri: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate 2s delay for unzipping/reading

  // Return the mock parsed data (this is what you wanted to see on the card)
  return {
    chatName: 'John Smith and Jane Doe',
    messageCount: '524',
  }
}
// ----------------------------------

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent()

  useEffect(() => {
    // Define an async function to handle the file processing logic
    const handleShareIntent = async () => {
      if (hasShareIntent && shareIntent) {
        if (shareIntent.files && shareIntent.files.length > 0) {
          const sharedFile = shareIntent.files[0]
          const fileUri = sharedFile.path
          const mimeType = sharedFile.mimeType

          console.log('--- STARTING IN-LAYOUT FILE PROCESSING ---')

          // 1. AWAIT PARSING: Perform the file reading/unzipping here
          const { chatName, messageCount } = await parseChatFile(fileUri)

          // 2. REDIRECT with PARSED DATA
          router.replace({
            pathname: '/chats',
            params: {
              fileUri: fileUri,
              // Pass the actual parsed data
              importedChatName: chatName,
              importedMessageCount: messageCount,
            },
          })

          resetShareIntent()
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

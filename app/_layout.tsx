import { useColorScheme } from '@/hooks/use-color-scheme'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import * as FileSystem from 'expo-file-system/legacy' // Use legacy API
import { Stack, router } from 'expo-router'
import { useShareIntent } from 'expo-share-intent'
import { StatusBar } from 'expo-status-bar'
import JSZip from 'jszip' // Pure JS ZIP library
import { useEffect } from 'react'
import 'react-native-reanimated'

// --- REAL PARSING FUNCTION ---
const parseChatFile = async (uri: string) => {
  try {
    // 1. Define paths
    const zipPath = uri // The shared .zip file URI

    // 2. Read the .zip file as Base64
    console.log('Attempting to load ZIP:', zipPath)
    const zipContent = await FileSystem.readAsStringAsync(zipPath, {
      encoding: FileSystem.EncodingType.Base64,
    })

    // 3. Load and unzip using JSZip
    const zip = await JSZip.loadAsync(zipContent, { base64: true })
    console.log('ZIP loaded successfully')

    // 4. Log all files in the ZIP for debugging
    const zipFiles = Object.keys(zip.files)
    console.log('Files in ZIP:', zipFiles)

    // 5. Find the chat file (_chat.txt or any .txt file)
    let chatFileEntry = zip.file('_chat.txt')
    if (!chatFileEntry) {
      // Try finding any .txt file
      const txtFile = zipFiles.find((file) => file.toLowerCase().endsWith('.txt'))
      if (!txtFile) {
        throw new Error('No .txt file found in the zip. Available files: ' + zipFiles.join(', '))
      }
      chatFileEntry = zip.file(txtFile)
      if (!chatFileEntry) {
        throw new Error(`Failed to access .txt file: ${txtFile}`)
      }
      console.log('Using alternative text file:', txtFile)
    } else {
      console.log('Found _chat.txt')
    }

    // 6. Read the chat file content directly
    const chatContent = await chatFileEntry.async('string')

    // 7. Parse the chat content
    const lines = chatContent.split('\n').filter((line) => line.trim())
    let chatName = 'Unknown Chat'
    let messageCount = 0

    // WhatsApp chat format: [date, time] Sender: Message
    if (lines.length > 0) {
      const firstLine = lines[0]
      const senderMatch = firstLine.match(/\[.*?\]\s*([^:]+):/)
      chatName = senderMatch ? senderMatch[1].trim() : 'WhatsApp Chat'
      messageCount = lines.length // Count non-empty lines as messages
    }

    console.log('Parsed chat:', { chatName, messageCount })

    return {
      chatName,
      messageCount: messageCount.toString(),
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error parsing chat file:', errorMessage)
    throw new Error(`Failed to parse WhatsApp chat file: ${errorMessage}`)
  }
}

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
            const { chatName, messageCount } = await parseChatFile(fileUri)

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

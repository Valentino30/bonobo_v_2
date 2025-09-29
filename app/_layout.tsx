import { useColorScheme } from '@/hooks/use-color-scheme'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { useShareIntent } from 'expo-share-intent'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { handleShareIntent } from '../utils/handleShareIntent'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const shareIntentData = useShareIntent()

  useEffect(() => {
    handleShareIntent(shareIntentData)
  }, [shareIntentData])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="chats" options={{ headerShown: true, title: 'My Chats' }} />
        <Stack.Screen name="chat-analysis" options={{ headerShown: true, title: 'Chat Analysis' }} />
        <Stack.Screen name="ai-analysis" options={{ headerShown: true, title: 'AI Analysis' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}

import { useColorScheme } from '@/hooks/use-color-scheme'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { useShareIntent } from 'expo-share-intent'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

export const unstable_settings = {
  anchor: '(tabs)',
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent()

  useEffect(() => {
    if (hasShareIntent && shareIntent) {
      console.log('--- RECEIVED WHATSAPP SHARE DATA ---')
      console.log(JSON.stringify(shareIntent, null, 2))
      if (shareIntent.webUrl) {
        console.log('File URI (or URL):', shareIntent.webUrl)
      } else if (shareIntent.files && shareIntent.files.length > 0) {
        console.log('Shared URL:', shareIntent.webUrl)
      }
      console.log('-----------------------------------')
      resetShareIntent()
    }
  }, [hasShareIntent, shareIntent, resetShareIntent])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}

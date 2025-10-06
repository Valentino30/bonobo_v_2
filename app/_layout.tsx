import { theme } from '@/constants/theme'
import { ThemeProvider } from '@/context/ThemeProvider'
import { Nunito_400Regular } from '@expo-google-fonts/nunito/400Regular'
import { Nunito_400Regular_Italic } from '@expo-google-fonts/nunito/400Regular_Italic'
import { Nunito_600SemiBold } from '@expo-google-fonts/nunito/600SemiBold'
import { Nunito_700Bold } from '@expo-google-fonts/nunito/700Bold'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { useShareIntent } from 'expo-share-intent'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { handleShareIntent } from '../utils/handleShareIntent'

export default function RootLayout() {
  const shareIntentData = useShareIntent()
  const [loaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_600SemiBold,
    Nunito_400Regular_Italic,
  })

  useEffect(() => {
    handleShareIntent(shareIntentData)
  }, [shareIntentData])

  if (!loaded && !error) {
    SplashScreen.preventAutoHideAsync()
    return null
  }

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.light.background },
          headerTintColor: theme.light.text,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28,
            fontFamily: 'Nunito_700Bold',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="chats" options={{ headerShown: true, title: 'My Chats' }} />
        <Stack.Screen name="chat-analysis" options={{ headerShown: true, title: 'Chat Analysis' }} />
        <Stack.Screen name="ai-analysis" options={{ headerShown: true, title: 'AI Analysis' }} />
        <Stack.Screen name="select-device" options={{ headerShown: true, title: 'Select Device' }} />
        <Stack.Screen name="import-chat" options={{ headerShown: true, title: 'Import Chat' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}

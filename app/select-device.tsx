import { ThemedButton, ThemedText, ThemedView } from '@/components'
import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function SelectDeviceScreen() {
  const navigateToImport = (platform: 'ios' | 'android') => {
    router.push({
      pathname: '/import-chat',
      params: { platform: platform },
    })
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.subtitle}>Which type of phone are you exporting your chat from?</ThemedText>
      <View style={styles.buttonContainer}>
        <ThemedButton title="iPhone" onPress={() => navigateToImport('ios')} />
        <View style={styles.spacer} />
        <ThemedButton title="Android" onPress={() => navigateToImport('android')} />
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
  },
  spacer: {
    height: 20,
  },
})

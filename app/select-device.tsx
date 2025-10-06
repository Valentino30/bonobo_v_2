import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { router } from 'expo-router'
import { Button, StyleSheet, View } from 'react-native'

export default function SelectDeviceScreen() {
  const navigateToImport = (platform: 'ios' | 'android') => {
    router.push({
      pathname: '/import-chat',
      params: { platform: platform },
    })
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Select Your Device</ThemedText>
      <ThemedText style={styles.subtitle}>Which type of phone are you exporting your chat from?</ThemedText>

      <View style={styles.buttonContainer}>
        <Button title="iPhone" onPress={() => navigateToImport('ios')} />
        <View style={styles.spacer} />
        <Button title="Android" onPress={() => navigateToImport('android')} />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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

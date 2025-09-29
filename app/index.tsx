import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { router } from 'expo-router'
import { Button, StyleSheet } from 'react-native'

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Welcome to Bonobo</ThemedText>
      <Button
        title="Analyze Chat"
        onPress={() => {
          router.push('/chats')
        }}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
})

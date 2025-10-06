import { ThemedText, ThemedView } from '@/components'
import { WHATSAPP_EXPORT_STEPS_ANDROID, WHATSAPP_EXPORT_STEPS_IOS } from '@/constants/import'
import { useLocalSearchParams } from 'expo-router'
import { FlatList, StyleSheet, View } from 'react-native'

type Step = (typeof WHATSAPP_EXPORT_STEPS_IOS)[0]

const renderItem = ({ item, index }: { item: Step; index: number }) => (
  <ThemedView style={styles.stepContainer}>
    <ThemedText style={styles.instructionText}>{`${index + 1}. ${item.instruction}`}</ThemedText>
  </ThemedView>
)

export default function ImportChatScreen() {
  const params = useLocalSearchParams<{ platform: 'ios' | 'android' }>()
  const platform = params.platform || 'ios'

  const instructions = platform === 'android' ? WHATSAPP_EXPORT_STEPS_ANDROID : WHATSAPP_EXPORT_STEPS_IOS
  const titleText = platform === 'android' ? 'How to Export Chat (Android)' : 'How to Export Chat (iOS)'

  return (
    <ThemedView style={styles.container}>
      <View style={styles.scrollContent}>
        {/* Removed title */}

        <FlatList
          data={instructions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  scrollContent: {
    flex: 1,
  },
  openWhatsAppButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#AAAAAA',
    backgroundColor: 'transparent',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#AAAAAA',
    height: undefined,
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
    paddingRight: 10,
    fontWeight: 'normal',
  },
})

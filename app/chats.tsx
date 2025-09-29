import ChatCard from '@/components/ChatCard'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useLocalSearchParams } from 'expo-router'
import { FlatList } from 'react-native'

const emptyPressHandler = () => {
  console.log('Button pressed, but no action defined yet.')
}

export default function ChatsScreen() {
  const params = useLocalSearchParams<{
    fileUri?: string
    importedChatName?: string
    importedMessageCount?: string
  }>()

  const { fileUri, importedChatName, importedMessageCount } = params

  const allChats = [
    ...(importedChatName
      ? [
          {
            id: 'new-share',
            name: importedChatName,
            status: `${importedMessageCount} Messages Imported`,
            lastImport: 'Just now',
            isNew: true,
            uri: fileUri,
          },
        ]
      : []),
  ]

  return (
    <ThemedView>
      <FlatList
        data={allChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatCard chat={item} onPress={emptyPressHandler} />}
        ListEmptyComponent={<ThemedText>Share a WhatsApp chat export to get started!</ThemedText>}
      />
    </ThemedView>
  )
}

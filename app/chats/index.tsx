import ChatCard from '@/components/ChatCard'
import { useLocalSearchParams } from 'expo-router'
import { FlatList, Text, View } from 'react-native'
import { styles } from './styles'

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
    <View style={styles.container}>
      <FlatList
        data={allChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatCard chat={item} onPress={emptyPressHandler} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Share a WhatsApp chat export to get started!</Text>}
      />
    </View>
  )
}

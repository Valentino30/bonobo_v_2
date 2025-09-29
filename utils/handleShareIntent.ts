import { router } from 'expo-router'
import { ShareIntent } from 'expo-share-intent'
import { ChatData } from '../types/chat'
import { parseChatFile } from './parseChatFile'

export const handleShareIntent = async ({
  hasShareIntent,
  shareIntent,
  resetShareIntent,
}: {
  hasShareIntent: boolean
  shareIntent: ShareIntent | null
  resetShareIntent: () => void
}) => {
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
        // Parse the WhatsApp chat file
        const chatData: ChatData = await parseChatFile(fileUri)

        const chatDetails = {
          fileUri,
          chatName: chatData.chatName,
          messageCount: chatData.messageCount,
          sender1: chatData.senders[0] || '',
          sender1Count: chatData.senderCounts[chatData.senders[0]]?.toString() || '0',
          sender2: chatData.senders[1] || '',
          sender2Count: chatData.senderCounts[chatData.senders[1]]?.toString() || '0',
          messagesBySender1: JSON.stringify(chatData.messagesBySender[chatData.senders[0]] || []),
          messagesBySender2: JSON.stringify(chatData.messagesBySender[chatData.senders[1]] || []),
        }

        // Redirect to chats screen with chat data
        router.replace({
          pathname: '/chats',
          params: {
            chat: JSON.stringify(chatDetails),
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

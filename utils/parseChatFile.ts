import * as FileSystem from 'expo-file-system/legacy'
import JSZip from 'jszip'
import { ChatData } from '../types/chat'

export const parseChatFile = async (uri: string): Promise<ChatData> => {
  try {
    // 1. Define paths and extract file name for fallback
    const zipPath = uri
    const fileName = zipPath.split('/').pop()?.replace('.zip', '') || 'WhatsApp Chat'
    const formattedChatName = fileName.replace('WhatsApp Chat with ', '').replace(/ & /g, ':')
    console.log('Attempting to load ZIP:', zipPath)

    // 2. Read the .zip file as Base64
    const zipContent = await FileSystem.readAsStringAsync(zipPath, {
      encoding: FileSystem.EncodingType.Base64,
    })

    // 3. Load and unzip using JSZip
    const zip = await JSZip.loadAsync(zipContent, { base64: true })
    console.log('ZIP loaded successfully')

    // 4. Log all files in the ZIP for debugging
    const zipFiles = Object.keys(zip.files)
    console.log('Files in ZIP:', zipFiles)

    // 5. Find the chat file (_chat.txt or any .txt file)
    let chatFileEntry: JSZip.JSZipObject | null = zip.file('_chat.txt')
    if (!chatFileEntry) {
      const txtFile = zipFiles.find((file) => file.toLowerCase().endsWith('.txt'))
      if (!txtFile) {
        throw new Error(`No .txt file found in the zip. Available files: ${zipFiles.join(', ')}`)
      }
      chatFileEntry = zip.file(txtFile)
      if (!chatFileEntry) {
        throw new Error(`Failed to access .txt file: ${txtFile}`)
      }
      console.log('Using alternative text file:', txtFile)
    } else {
      console.log('Found _chat.txt')
    }

    // 6. Read the chat file content directly
    const chatContent = await chatFileEntry.async('string')

    // 7. Parse the chat content
    const lines = chatContent.split('\n').filter((line) => line.trim())
    let chatName = formattedChatName
    let messageCount = 0
    const senders = new Set<string>()
    const senderCounts: { [key: string]: number } = {}
    const messagesBySender: { [key: string]: string[] } = {}

    // Log first 5 lines for debugging
    console.log('First 5 lines of chat for debugging:', lines.slice(0, 5))

    // WhatsApp chat format: Flexible regex to match various date/time formats
    const messageRegex = /^(\d{1,2}\/\d{1,2}\/\d{2,4},\s*\d{1,2}:\d{2}(?:\s*[AP]M)?\s*[-–]\s*)([^:]+):(.*)/
    for (const line of lines) {
      const senderMatch = line.match(messageRegex)
      if (senderMatch && senderMatch[2] && senderMatch[3]) {
        const sender = senderMatch[2].trim()
        const message = senderMatch[3].trim()
        if (message !== '<Media omitted>') {
          senders.add(sender)
          senderCounts[sender] = (senderCounts[sender] || 0) + 1
          if (!messagesBySender[sender]) {
            messagesBySender[sender] = []
          }
          messagesBySender[sender].push(message)
          messageCount++
          console.log('Found message from:', sender, 'Message:', message)
        }
      }
    }

    // Combine first two senders for chatName, fallback to file name
    if (senders.size >= 2) {
      const [name1, name2] = Array.from(senders)
      chatName = `${name1} & ${name2}`
      console.log('Extracted chatName from senders:', chatName)
    } else if (senders.size === 1) {
      chatName = Array.from(senders)[0]
      console.log('Extracted chatName from single sender:', chatName)
    }

    // Log parsing results
    console.log('First line of chat for parsing:', lines[0])
    console.log('Parsed chat:', { chatName, messageCount, senders: Array.from(senders), senderCounts })

    return {
      chatName,
      messageCount: messageCount.toString(),
      senders: Array.from(senders),
      senderCounts,
      messagesBySender,
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error parsing chat file:', errorMessage)
    throw new Error(`Failed to parse WhatsApp chat file: ${errorMessage}`)
  }
}

export interface IChat {
  id: string
  name: string
  status: string
  lastImport: string
  isNew: boolean
  uri?: string
}
export interface ChatData {
  chatName: string
  messageCount: string
  senders: string[]
  senderCounts: { [key: string]: number }
  messagesBySender: { [key: string]: string[] }
}

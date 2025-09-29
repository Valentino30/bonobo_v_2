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

export interface ChatAnalysisData {
  chatName: string
  messageCount: number
  sender1: string
  sender1Count: number
  sender2: string
  sender2Count: number
  messagesBySender1: string
  messagesBySender2: string
}

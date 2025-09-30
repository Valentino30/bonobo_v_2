import { Model } from '@nozbe/watermelondb'
import { field, relation, text } from '@nozbe/watermelondb/decorators'
import { Associations } from '@nozbe/watermelondb/Model'

export default class ChatAnalysis extends Model {
  static table = 'chat_analyses'

  static associations: Associations = {
    chats: { type: 'belongs_to', key: 'chat_id' },
  }

  @text('chat_id') chatId!: string
  @field('total_messages') totalMessages!: number

  @text('user_stats') userStats!: string
  @text('ai_summary') aiSummary!: string

  @relation('chats', 'chat_id') chat: any // Relation to parent Chat
}

import { Model } from '@nozbe/watermelondb'
import { children, date, text } from '@nozbe/watermelondb/decorators'
import { Associations } from '@nozbe/watermelondb/Model'

export default class Chat extends Model {
  static table = 'chats'

  static associations: Associations = {
    chat_analyses: { type: 'has_many', foreignKey: 'chat_id' },
  }

  @text('chat_name') chatName!: string
  @text('raw_content') rawContent!: string
  @text('device_id') deviceId!: string

  @date('created_at') createdAt!: number
  @date('updated_at') updatedAt!: number

  @children('chat_analyses') analyses: any
}

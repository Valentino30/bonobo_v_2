import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'chats',
      columns: [
        { name: 'device_id', type: 'string', isIndexed: true },
        { name: 'chat_name', type: 'string' },
        { name: 'raw_content', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'chat_analyses',
      columns: [
        { name: 'chat_id', type: 'string', isIndexed: true },
        { name: 'total_messages', type: 'number' },
        { name: 'user_stats', type: 'string' },
        { name: 'ai_summary', type: 'string', isOptional: true },
      ],
    }),
  ],
})

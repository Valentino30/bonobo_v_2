import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import Chat from './models/Chat'
import ChatAnalysis from './models/ChatAnalysis'
import schema from './schema'

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'chatAnalyzerDB',
  jsi: true,
  onSetUpError: (error) => {
    if (__DEV__) {
      console.error('Database setup failed', error)
    }
  },
})

export const database = new Database({
  adapter,
  modelClasses: [Chat, ChatAnalysis],
})

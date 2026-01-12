import * as schema from '@/functions/libs/drizzle/schema'
import Database from 'better-sqlite3'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/better-sqlite3'

const drizzleClientSingleton = () => {
  const sqlite = new Database(process.env['DATABASE_URL']! ?? './sqlite.db')
  // NOTE: schemaを渡すことで型安全になる
  return drizzle(sqlite, { schema })
}

declare const globalThis: {
  drizzleGlobal: ReturnType<typeof drizzleClientSingleton>
} & typeof global

const db = globalThis.drizzleGlobal ?? drizzleClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') globalThis.drizzleGlobal = db

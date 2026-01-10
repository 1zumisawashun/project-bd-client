import 'dotenv/config'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from '@/../drizzle/schema'

const drizzleClientSingleton = () => {
  const sqlite = new Database(process.env['DATABASE_URL'] || './sqlite.db')
  return drizzle(sqlite, { schema })
}

declare const globalThis: {
  drizzleGlobal: ReturnType<typeof drizzleClientSingleton>
} & typeof global

const db = globalThis.drizzleGlobal ?? drizzleClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') globalThis.drizzleGlobal = db
// Contains AI-generated edits.

import 'dotenv/config'
import { drizzle } from 'drizzle-orm/pglite'
import * as schema from '@/../../drizzle/schema'

const drizzleClientSingleton = () => {
  return drizzle(process.env['DATABASE_URL']!, { schema })
}

declare const globalThis: {
  drizzleGlobal: ReturnType<typeof drizzleClientSingleton>
} & typeof global

const db = globalThis.drizzleGlobal ?? drizzleClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') globalThis.drizzleGlobal = db

// Contains AI-generated edits.

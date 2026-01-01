import 'dotenv/config'
import { drizzle } from 'drizzle-orm/pglite'
import { PGlite } from '@electric-sql/pglite'
import * as schema from './schema'

const client = new PGlite(process.env['DATABASE_URL'] ?? './data/pglite')

const db = drizzle(client, { schema })

export default db

// Contains AI-generated edits.

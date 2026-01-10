import 'dotenv/config'
import { defineConfig, type Config } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle/migrations',
  schema: './drizzle/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env['DATABASE_URL'] || './sqlite.db',
  },
}) satisfies Config
// Contains AI-generated edits.

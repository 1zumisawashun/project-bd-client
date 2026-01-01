import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './app/functions/libs/drizzle-client/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env['DATABASE_URL'] ?? './data/pglite',
  },
})

// Contains AI-generated edits.

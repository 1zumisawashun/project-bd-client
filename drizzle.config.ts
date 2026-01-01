import 'dotenv/config'
import { defineConfig, type Config } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle/migrations',
  schema: './drizzle/schema.ts',
  dialect: 'postgresql',
  driver: 'pglite',
  dbCredentials: {
    url: process.env['DATABASE_URL']!,
  },
}) satisfies Config

import 'dotenv/config'
import { defineConfig, type Config } from 'drizzle-kit'

export default defineConfig({
  out: './app/functions/libs/drizzle/migrations',
  schema: './app/functions/libs/drizzle/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: './sqlite.db',
  },
}) satisfies Config

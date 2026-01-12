import 'dotenv/config'
import { defineConfig, type Config } from 'drizzle-kit'

export default defineConfig({
  out: './app/functions/libs/drizzle/migrations',
  schema: './app/functions/libs/drizzle/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    // FIXME: ENV読み込めていないので修正する
    url: process.env['DATABASE_URL']! ?? './sqlite.db',
  },
}) satisfies Config

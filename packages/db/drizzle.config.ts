import "dotenv/config";
import { defineConfig, type Config } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./src/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    // NOTE: repo root直下のsqlite.dbを参照する（apps/web/apps/admin側のclient.tsと同じ考え方）
    url: "../../sqlite.db",
  },
}) satisfies Config;

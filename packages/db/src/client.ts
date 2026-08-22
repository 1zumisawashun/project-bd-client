import path from "node:path";
import Database from "better-sqlite3";
import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

// NOTE: apps/web・apps/admin・packages/db はいずれもrepo rootから2階層下にあるため、
// process.cwd()基準の相対パスでrepo root直下のsqlite.dbを共有できる（ローカル開発用の簡易対応）
const SQLITE_DB_PATH = path.resolve(process.cwd(), "../../sqlite.db");

const drizzleClientSingleton = () => {
  const sqlite = new Database(SQLITE_DB_PATH);
  // NOTE: schemaを渡すことで型安全になる
  return drizzle(sqlite, { schema });
};

// oxlint-disable-next-line
declare const globalThis: {
  drizzleGlobal: ReturnType<typeof drizzleClientSingleton>;
} & typeof global;

const db = globalThis.drizzleGlobal ?? drizzleClientSingleton();

export default db;

if (process.env["NODE_ENV"] !== "production") globalThis.drizzleGlobal = db;

import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// NOTE: admin-apiはAPI専業化（Route Handler + DBアクセスのみ）になったため、
// React/jsdom環境は不要。Node環境でRoute Handler・zodスキーマのテストのみを実行する。
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    include: [
      "app/api/categories/categoryForm.schema.test.ts",
      "app/api/categories/route.test.ts",
    ],
  },
});

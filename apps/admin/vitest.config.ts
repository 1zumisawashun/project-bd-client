import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // NOTE: apps/web/vitest.config.ts と同じ理由でCSS処理を無効化している
    css: false,
    // NOTE: PR2（jestの全テスト移行）が終わるまでは、vitestに移行済みのファイルだけを対象にする
    include: ["app/pages/categories/categoryForm.schema.test.ts"],
  },
});

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // NOTE: テストではCSS Modulesのクラス名の中身を検証しないため、
    // vite本体の実CSSパイプラインには乗せず、jestのidentity-obj-proxy相当の
    // 軽量な扱い（未設定時はCSSインポートを空スタブにする）にしている
    css: false,
  },
});

import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// NOTE: admin-apiのRoute Handlerと同一オリジンに見せるため、ローカル開発では
// Viteのdev proxyで `/api/*` を apps/admin-api（3001番ポート）に転送する。
// 本番(Vercel)ではrewritesで同じことを行う @see apps/admin/vercel.json
//
// vite.config.ts自体はNode上で動くため、.env.localの値を使うには
// loadEnv()で明示的に読み込む必要がある（import.meta.envはクライアントコード用で、
// ここではまだ使えない）。
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const adminApiOrigin = env["ADMIN_API_ORIGIN"] ?? "http://localhost:3001";

  return {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [tanstackRouter({ target: "react", autoCodeSplitting: true }), react()],
    server: {
      port: 3002,
      proxy: {
        "/api": {
          target: adminApiOrigin,
          changeOrigin: true,
        },
      },
    },
  };
});

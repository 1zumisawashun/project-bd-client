// NOTE: 認証が必要なルートへの未ログインアクセス（401）/ 非管理者アクセス（403）を
// admin-apiのAPIレスポンスから検知した際に、web側の該当ページへリダイレクトするための設定。
// apps/web の app/page.tsx (旧 apps/admin の page.tsx) にあった WEB_APP_URL と同じ考え方。
export const WEB_APP_URL: string =
  (import.meta.env["VITE_WEB_APP_URL"] as string | undefined) ?? "http://localhost:3000";

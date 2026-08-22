import { redirect } from "next/navigation";
import { getSession } from "@project-bd-client/auth/session";

const WEB_APP_URL = process.env["WEB_APP_URL"] ?? "http://localhost:3000";

export default async function AdminDashboardPage() {
  const session = await getSession();

  // 未認証ユーザーは web 側のログインページへリダイレクト
  if (!session?.user?.email) {
    redirect(`${WEB_APP_URL}/sign-in`);
  }

  // 非管理者ユーザーは web 側のホームへリダイレクト
  if (session.user.role !== "ADMIN") {
    redirect(WEB_APP_URL);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>管理ダッシュボード</h1>
      <p>{session.user.email} としてログイン中です。</p>
    </div>
  );
}

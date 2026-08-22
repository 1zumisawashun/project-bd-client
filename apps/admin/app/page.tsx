import { redirect } from "next/navigation";
import { getCategories } from "@/functions/db/category";
import { getSession } from "@project-bd-client/auth/session";
import { AdminCategoriesPage } from "@/pages/categories/AdminCategoriesPage";

const WEB_APP_URL = process.env["WEB_APP_URL"] ?? "http://localhost:3000";

export default async function Page() {
  const session = await getSession();

  // 未認証ユーザーは web 側のログインページへリダイレクト
  if (!session?.user?.email) {
    redirect(`${WEB_APP_URL}/sign-in`);
  }

  // 非管理者ユーザーは web 側のホームへリダイレクト
  if (session.user.role !== "ADMIN") {
    redirect(WEB_APP_URL);
  }

  // カテゴリー一覧を取得
  const categories = await getCategories();

  return <AdminCategoriesPage categories={categories ?? []} />;
}

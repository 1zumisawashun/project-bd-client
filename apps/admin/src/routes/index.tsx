import { createFileRoute } from "@tanstack/react-router";
import { categoriesQueryOptions } from "@/features/categories/categories.queries";
import { AdminCategoriesPage } from "@/features/categories/AdminCategoriesPage";
import { ApiError } from "@/lib/apiError";
import { WEB_APP_URL } from "@/lib/config";

export const Route = createFileRoute("/")({
  // NOTE: ルートガード。admin-apiのAPIレスポンスのステータスに応じてリダイレクトする
  // （旧 apps/admin/app/page.tsx の getSession() によるチェックと同じ意図）。
  // web側は別オリジンのため、TanStack Routerの内部 redirect() ではなく
  // window.location によるハードナビゲーションで遷移する。
  // @see apps/admin-api/app/api/categories/route.ts
  loader: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData(categoriesQueryOptions());
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          window.location.href = `${WEB_APP_URL}/sign-in`;
        } else if (error.status === 403) {
          window.location.href = WEB_APP_URL;
        }
      }
      throw error;
    }
  },
  component: AdminCategoriesPage,
});

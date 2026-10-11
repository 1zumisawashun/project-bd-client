import { NextResponse } from "next/server";
import { getSession } from "@project-bd-client/auth/session";
import { createCategory, getCategories, getCategoryByName } from "@/functions/db/category";
import { categoryFormSchema } from "./categoryForm.schema";

/**
 * NOTE:
 * もともと admin は middleware（Edge Runtime）でログイン有無のみ、
 * page.tsx（Node Runtime）でロール（ADMIN）判定、という二段構成だった。
 * middlewareはページのHTMLリダイレクトを前提にしており、APIが返すべきJSONレスポンスとは
 * 相性が悪いため廃止し、この関数でセッション・ロール判定を一箇所にまとめる。
 * @see apps/admin-api/app/api/categories/route.test.ts
 */
async function requireAdminSession() {
  const session = await getSession();

  if (!session?.user?.email) {
    return {
      error: NextResponse.json({ message: "ログインしてください" }, { status: 401 }),
    } as const;
  }

  if (session.user.role !== "ADMIN") {
    return {
      error: NextResponse.json({ message: "管理者権限が必要です" }, { status: 403 }),
    } as const;
  }

  return { session } as const;
}

export async function GET() {
  const auth = await requireAdminSession();
  if ("error" in auth) return auth.error;

  const categories = await getCategories();
  return NextResponse.json({ categories: categories ?? [] });
}

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if ("error" in auth) return auth.error;

  const body: unknown = await request.json();
  const parsed = categoryFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "不正な入力です" },
      { status: 400 },
    );
  }

  const existingCategory = await getCategoryByName({ name: parsed.data.name });
  if (existingCategory) {
    return NextResponse.json({ message: "このカテゴリー名は既に存在します" }, { status: 409 });
  }

  const category = await createCategory({ name: parsed.data.name });
  if (!category) {
    return NextResponse.json({ message: "カテゴリーの作成に失敗しました" }, { status: 500 });
  }

  return NextResponse.json({ id: category.id, name: category.name }, { status: 201 });
}

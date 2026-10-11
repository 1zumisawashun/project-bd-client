import { z } from "zod";

// NOTE: apps/admin-api/app/api/categories/categoryForm.schema.ts と同じ定義。
// クライアント側の入力バリデーション用に複製している（サーバー側の最終バリデーションは
// admin-api側で行われるため、こちらはUXのための早期チェック）。
export const categoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: "カテゴリー名は必須です",
    })
    .max(100, {
      message: "カテゴリー名は100文字以内で入力してください",
    }),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

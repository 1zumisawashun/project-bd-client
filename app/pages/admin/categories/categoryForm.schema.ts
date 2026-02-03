import { z } from 'zod'

export const categoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: 'カテゴリー名は必須です',
    })
    .max(100, {
      message: 'カテゴリー名は100文字以内で入力してください',
    }),
})

export type CategoryFormValues = z.infer<typeof categoryFormSchema>

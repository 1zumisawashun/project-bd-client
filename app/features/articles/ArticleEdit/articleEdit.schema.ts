import * as z from 'zod'

export const schema = z.object({
  title: z.string(),
  content: z.string(),
  // 重複するカテゴリはNG, 最大5つまで
  categories: z
    .object({ name: z.string() })
    .array()
    .max(5, '最大で5つまで登録できます'),
  status: z.enum(['PUBLISHED', 'DRAFT']),
})

export type Schema = z.infer<typeof schema>

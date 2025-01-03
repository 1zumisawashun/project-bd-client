import * as z from 'zod'

export const emailSchema = z.object({
  email: z.string().email('メールアドレスの形式で入力してください'),
})

export type EmailSchema = z.infer<typeof emailSchema>

import * as z from 'zod'

export const schema = z.object({
  email: z.string().email('メールアドレスの形式で入力してください'),
})

export type Schema = z.infer<typeof schema>

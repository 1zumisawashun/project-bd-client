import * as z from 'zod'

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'This field is required')
    .max(255, '255文字以内で入力してください'),
})

export type ProfileSchema = z.infer<typeof profileSchema>

import { z } from 'zod'
import isStrongPassword from 'validator/lib/isStrongPassword'

/** @see https://dninomiya.github.io/form-guide/ */

export const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: 'メールアドレスを入力してください。',
    })
    .email({
      message: 'メールアドレスの形式で入力してください。',
    })
    .max(254, {
      message: '最大254文字までです。',
    }),
  password: z
    .string()
    .trim()
    .min(8, {
      message: '最小8文字以上です。',
    })
    .refine(isStrongPassword, {
      message: '大文字を含む半角英数字と記号を含めてください。',
    }),
})

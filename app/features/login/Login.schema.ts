import { z } from "zod"

export const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'This field is required'),
})

export type Schema = z.infer<typeof schema>
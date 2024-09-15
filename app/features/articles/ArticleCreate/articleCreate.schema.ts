import * as z from 'zod'

export const schema = z.object({
  title: z.string(),
  content: z.string(),
})

export type Schema = z.infer<typeof schema>

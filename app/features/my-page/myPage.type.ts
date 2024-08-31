import { getUserById } from '@/functions/db/user'

export type User = NonNullable<Awaited<ReturnType<typeof getUserById>>>

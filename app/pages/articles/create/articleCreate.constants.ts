import { CONTENT } from '@/functions/libs/drizzle/constants/articles'

export const defaultValues = {
  title: '',
  content: CONTENT,
  categories: [],
  status: 'PUBLISHED' as const,
}

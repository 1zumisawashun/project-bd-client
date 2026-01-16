import { CONTENT } from '@/features/articles/constants'

export const defaultValues = {
  title: '',
  content: CONTENT,
  categories: [],
  status: 'PUBLISHED' as const,
}

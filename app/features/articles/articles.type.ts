export type Article = {
  id: string
  title: string
  content: string
  status: string
  published: boolean
  updatedAt: Date
  createdAt: Date
  categories: {
    id: string
    name: string
  }[]
}

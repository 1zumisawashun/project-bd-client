type Category = {
  id: string
  name: string
  createdAt: Date
}

type CategoryListProps = {
  categories: Category[]
}

export function CategoryList({ categories }: CategoryListProps) {
  if (categories.length === 0) {
    return <p className="text-gray-500">カテゴリーがまだ作成されていません</p>
  }

  return (
    <ul className="space-y-2">
      {categories.map((category) => (
        <li
          key={category.id}
          className="flex justify-between items-center p-3 border rounded"
        >
          <span className="font-medium">{category.name}</span>
          <span className="text-sm text-gray-500">
            {category.createdAt.toLocaleDateString('ja-JP')}
          </span>
        </li>
      ))}
    </ul>
  )
}

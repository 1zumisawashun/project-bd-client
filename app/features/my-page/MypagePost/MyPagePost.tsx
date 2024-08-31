import { ArticleListCard } from '@/features/articles/ArticleList/components/ArticleListCard'
import { ArticleListCardGroup } from '@/features/articles/ArticleList/components/ArticleListCardGroup'
import { articles } from '@/features/articles/articles.constant'

export const MyPagePost: React.FC = () => {
  return (
    <ArticleListCardGroup>
      {articles.map((article) => (
        <ArticleListCard key={article.id} article={article} />
      ))}
    </ArticleListCardGroup>
  )
}

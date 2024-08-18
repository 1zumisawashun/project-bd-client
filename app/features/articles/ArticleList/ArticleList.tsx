import { ArticleListCard } from './components/ArticleListCard'
import { ArticleListCardGroup } from './components/ArticleListCardGroup'
import { articles } from '../articles.constant'

export const ArticleList: React.FC = () => {
  return (
    <ArticleListCardGroup>
      {articles.map((article) => (
        <ArticleListCard key={article.id} article={article} />
      ))}
    </ArticleListCardGroup>
  )
}

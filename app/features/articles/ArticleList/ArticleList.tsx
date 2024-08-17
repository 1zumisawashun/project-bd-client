import { ArticleCard, ArticleCardGroup } from '../components/ArticleCard'
import { articles } from '../articles.constant'

export const ArticleList: React.FC = () => {
  return (
    <ArticleCardGroup>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </ArticleCardGroup>
  )
}

/* eslint-disable react/no-danger */

import { AnchorButton } from '@/components/buttons/AnchorButton'
import { Article } from '@/functions/types'
import { VStack } from '@/components/elements/VStack'
import { Title } from '@/components/elements/Typography'
import styles from './articleDetail.module.scss'

const BLOCK_NAME = 'article-detail'
type Props = {
  article: Article
}
export const ArticleDetail: React.FC<Props> = ({ article }) => {
  return (
    <VStack>
      <Title as="h1">{article.title}</Title>
      <AnchorButton href={`/articles/${article.id}/edit`}>Edit</AnchorButton>

      <div
        className={styles[`${BLOCK_NAME}-content`]}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </VStack>
  )
}

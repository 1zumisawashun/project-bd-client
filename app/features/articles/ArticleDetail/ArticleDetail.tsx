/* eslint-disable react/no-danger */

import { AnchorButton } from '@/components/buttons/AnchorButton'
import { Article } from '@/functions/types'
import { VStack } from '@/components/layouts/VStack'
import { Title } from '@/components/elements/Typography'
import { Button } from '@/components/buttons/Button'
import { KebabMenu } from '@/components/elements/KebabMenu'
import { HStack } from '@/components/layouts/HStack'
import styles from './articleDetail.module.scss'

const BLOCK_NAME = 'article-detail'
type Props = {
  article: Article
}
export const ArticleDetail: React.FC<Props> = ({ article }) => {
  return (
    <VStack>
      <Title as="h1" fontSize={6}>
        {article.title}
      </Title>
      <HStack align="center" style={{ justifyContent: 'space-between' }}>
        {article.createdAt.toDateString()}
        <KebabMenu
          render={() => (
            <>
              <AnchorButton
                variant="ghost"
                href={`/articles/${article.id}/edit`}
                className={styles[`${BLOCK_NAME}-button`]}
              >
                変更する
              </AnchorButton>
              <Button
                variant="ghost"
                className={styles[`${BLOCK_NAME}-button`]}
              >
                削除する
              </Button>
            </>
          )}
        />
      </HStack>

      <div
        className={styles[`${BLOCK_NAME}-content`]}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </VStack>
  )
}

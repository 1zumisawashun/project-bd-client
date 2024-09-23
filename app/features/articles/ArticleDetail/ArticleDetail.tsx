/* eslint-disable react/no-danger */

'use client'

import { AnchorButton } from '@/components/buttons/AnchorButton'
import { Article } from '@/functions/types'
import { VStack } from '@/components/layouts/VStack'
import { Title } from '@/components/elements/Typography'
import { Button } from '@/components/buttons/Button'
import { KebabMenu } from '@/components/elements/KebabMenu'
import { HStack } from '@/components/layouts/HStack'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { DeleteDialog } from './components/DeleteDialog'
import styles from './articleDetail.module.scss'
import { DraftDialog } from './components/DraftDialog'

const BLOCK_NAME = 'article-detail'
type Props = {
  article: Article
}
export const ArticleDetail: React.FC<Props> = ({ article }) => {
  const deleteDialog = useDisclosure()
  const draftDialog = useDisclosure()

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
                onClick={deleteDialog.open}
              >
                削除する
              </Button>
              <Button
                variant="ghost"
                className={styles[`${BLOCK_NAME}-button`]}
                onClick={draftDialog.open}
              >
                下書きに戻す
              </Button>
            </>
          )}
        />
      </HStack>

      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        articleId={article.id}
      />
      <DraftDialog isOpen={draftDialog.isOpen} onClose={draftDialog.close} articleId={article.id}/>

      <div
        className={styles[`${BLOCK_NAME}-content`]}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </VStack>
  )
}

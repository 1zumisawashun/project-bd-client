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
import { Status } from '@/components/elements/Status'
import { formatDateToJapaneseDate } from '@/functions/helpers/dateFormatter'
import { Label } from '@/components/elements/Label'
import { DeleteDialog } from './components/DeleteDialog'
import styles from './articleDetail.module.scss'
import { DraftDialog } from './components/DraftDialog'
import { PublishDialog } from './components/PublishDialog'
import { LikeButton } from './components/LikeButton'
import { DislikeButton } from './components/DislikeButton'

const BLOCK_NAME = 'article-detail'
type Props = {
  article: Article
  isAuthor: boolean
  userId: string
  isLike: boolean
}
export const ArticleDetail: React.FC<Props> = ({
  article,
  isAuthor,
  userId,
  isLike,
}) => {
  const deleteDialog = useDisclosure()
  const draftDialog = useDisclosure()
  const publishDialog = useDisclosure()

  return (
    <VStack>
      {isAuthor && article.status === 'DRAFT' && (
        <Status title="この記事は下書きです">
          この記事は下書きです。公開する場合はケバブメニューの「公開する」ボタンまたは編集画面から「更新する」ボタンを押してください。
        </Status>
      )}

      <Title as="h1" fontSize={6}>
        {article.title}
      </Title>

      <HStack align="center" style={{ justifyContent: 'space-between' }}>
        公開日 {formatDateToJapaneseDate(new Date(article.createdAt))}
        <HStack>
          {isLike ? (
            <LikeButton userId={userId} articleId={article.id} />
          ) : (
            <DislikeButton userId={userId} articleId={article.id} />
          )}

          {isAuthor && (
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
                  {article.status === 'DRAFT' ? (
                    <Button
                      variant="ghost"
                      className={styles[`${BLOCK_NAME}-button`]}
                      onClick={publishDialog.open}
                    >
                      公開する
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      className={styles[`${BLOCK_NAME}-button`]}
                      onClick={draftDialog.open}
                    >
                      下書きに戻す
                    </Button>
                  )}
                </>
              )}
            />
          )}
        </HStack>
      </HStack>

      <HStack style={{ flexWrap: 'wrap' }} gap={2}>
        {article.categories.map((category) => (
          <Label key={category.id}>{category.name}</Label>
        ))}
      </HStack>

      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        articleId={article.id}
      />
      <DraftDialog
        isOpen={draftDialog.isOpen}
        onClose={draftDialog.close}
        articleId={article.id}
      />
      <PublishDialog
        isOpen={publishDialog.isOpen}
        onClose={publishDialog.close}
        articleId={article.id}
      />

      <div
        className={styles[`${BLOCK_NAME}-content`]}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </VStack>
  )
}

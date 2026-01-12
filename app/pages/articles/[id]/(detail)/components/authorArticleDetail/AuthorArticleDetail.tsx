'use client'

import { AnchorButton } from '@/components/buttons/AnchorButton'
import { Button } from '@/components/buttons/Button'
import { KebabMenu } from '@/components/elements/KebabMenu'
import { Status } from '@/components/elements/Status'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { FC, ReactNode } from 'react'
import { ArticleDetailArticle } from '../../articleDetail.types'
import { BaseArticleDetail } from '../baseArticleDetail/BaseArticleDetail'
import { DeleteDialog } from '../deleteDialog/DeleteDialog'
import { DraftDialog } from '../draftDialog/DraftDialog'
import { PublishDialog } from '../publishDialog/PublishDialog'
import styles from './authorArticleDetail.module.css'

const BLOCK_NAME = 'authorArticleDetail'

const buttonProps = {
  variant: 'ghost',
  // NOTE: stylesがundefinedになる可能性があるため、!を付与
  className: styles[`${BLOCK_NAME}-button`]!,
}

type AuthorArticleDetailProps = {
  article: ArticleDetailArticle
  likeButton: ReactNode
}

export const AuthorArticleDetail: FC<AuthorArticleDetailProps> = (props) => {
  const deleteDialog = useDisclosure()
  const draftDialog = useDisclosure()
  const publishDialog = useDisclosure()

  const isDraft = props.article.status === 'DRAFT'
  const articleId = props.article.id

  return (
    <>
      <BaseArticleDetail
        {...props}
        status={
          isDraft ? (
            <Status title="この記事は下書きです">
              この記事は下書きです。公開する場合はケバブメニューの「公開する」ボタンまたは編集画面から「更新する」ボタンを押してください。
            </Status>
          ) : null
        }
        kebabMenu={
          <KebabMenu
            render={() => (
              <>
                <AnchorButton
                  href={`/articles/${articleId}/edit`}
                  {...buttonProps}
                >
                  変更する
                </AnchorButton>
                <Button onClick={deleteDialog.open} {...buttonProps}>
                  削除する
                </Button>
                {isDraft ? (
                  <Button onClick={publishDialog.open}>公開する</Button>
                ) : (
                  <Button onClick={draftDialog.open} {...buttonProps}>
                    下書きに戻す
                  </Button>
                )}
              </>
            )}
          />
        }
      />
      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        articleId={articleId}
      />
      <DraftDialog
        isOpen={draftDialog.isOpen}
        onClose={draftDialog.close}
        articleId={articleId}
      />
      <PublishDialog
        isOpen={publishDialog.isOpen}
        onClose={publishDialog.close}
        articleId={articleId}
      />
    </>
  )
}

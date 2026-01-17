'use client'

import DOMPurify from 'dompurify'
import NextLink from 'next/link'
import { FC, ReactNode } from 'react'
import { Label } from '@/components/elements/Label'
import { Title } from '@/components/elements/Typography'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { formatDateToJapaneseDate } from '@/functions/helpers/dateFormatter'
import { Article } from '../../../../shared/article.types'
import styles from './baseArticleDetail.module.css'

const BLOCK_NAME = 'baseArticleDetail'

type BaseArticleDetailProps = {
  article: Article
  status: ReactNode
  likeButton: ReactNode
  kebabMenu: ReactNode
}

export const BaseArticleDetail: FC<BaseArticleDetailProps> = ({
  article,
  status,
  likeButton,
  kebabMenu,
}) => {
  const clean = DOMPurify.sanitize(article.content)

  return (
    <VStack>
      {status}

      <Title as="h1" fontSize={6}>
        {article.title}
      </Title>

      <HStack align="center" style={{ justifyContent: 'space-between' }}>
        公開日 {formatDateToJapaneseDate(new Date(article.createdAt))}
        <HStack>
          {likeButton}
          {kebabMenu}
        </HStack>
      </HStack>

      <HStack style={{ flexWrap: 'wrap' }} gap={2}>
        {article.categories.map(({ category }) => (
          <NextLink
            key={category.id}
            href={`/articles?category=${category.name}`}
          >
            <Label>{category.name}</Label>
          </NextLink>
        ))}
      </HStack>

      <div
        className={styles[`${BLOCK_NAME}-content`]}
        dangerouslySetInnerHTML={{ __html: clean }}
      />
    </VStack>
  )
}

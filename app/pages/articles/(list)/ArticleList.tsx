'use client'

import { VStack } from '@/components/layouts/VStack'
import { ArticleCard } from '@/features/articles/articleCard/ArticleCard'
import { ArticleCardGroup } from '@/features/articles/articleCardGroup/ArticleCardGroup'
import { Articles } from '@/functions/types'
import NextLink from 'next/link'
import { FC } from 'react'
import { SearchForm } from './components/searchForm/SearchForm'

type Props = {
  articles: Articles
  categoryOptions: string[]
  defaultValues: string[]
}

export const ArticleList: FC<Props> = ({
  articles,
  categoryOptions,
  defaultValues,
}) => {
  return (
    <VStack>
      <SearchForm
        categoryOptions={categoryOptions}
        defaultValues={defaultValues}
      />
      <ArticleCardGroup>
        {articles.map((article) => (
          <NextLink href={`/articles/${article.id}`} key={article.id}>
            <ArticleCard article={article} />
          </NextLink>
        ))}
      </ArticleCardGroup>
    </VStack>
  )
}

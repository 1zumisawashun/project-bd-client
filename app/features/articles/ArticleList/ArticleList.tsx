'use client'

import { VStack } from '@/components/layouts/VStack'
import { Articles } from '@/functions/types'
import NextLink from 'next/link'
import { FC } from 'react'
import { ArticleCard } from '../components/articleCard/ArticleCard'
import { ArticleCardGroup } from '../components/articleCardGroup/ArticleCardGroup'
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

'use client'

import NextLink from 'next/link'
import { FC } from 'react'
import { VStack } from '@/components/layouts/VStack'
import { ArticleCard } from '@/features/articles/articleCard/ArticleCard'
import { ArticleCardGroup } from '@/features/articles/articleCardGroup/ArticleCardGroup'
import { ArticleCategory } from '../shared/article.types'
import { ArticleListArticle } from './articleList.types'
import { SearchForm } from './components/searchForm/SearchForm'

type Props = {
  articles: ArticleListArticle[]
  categories: ArticleCategory[]
  defaultValues: string[]
}

export const ArticleList: FC<Props> = ({
  articles,
  categories,
  defaultValues,
}) => {
  const categoryOptions = categories?.map(({ name }) => name) ?? []

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

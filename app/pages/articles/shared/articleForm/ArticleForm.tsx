'use client'

import { VStack } from '@/components/layouts/VStack'
import { Lens } from '@hookform/lenses'
import { FC } from 'react'
import { Schema } from './articleForm.schema'
import { CategoriesInput } from './components/categoriesInput/CategoriesInput'
import { ContentInput } from './components/contentInput/ContentInput'
import { TitleInput } from './components/titleInput/TitleInput'

type ArticleFormProps = {
  lens: Lens<Schema>
  categoryOptions: string[]
}

// reflectで部分的なLensを作成する場合
export const ArticleForm: FC<ArticleFormProps> = ({
  lens,
  categoryOptions,
}) => {
  const titleLens = lens.reflect(({ title }) => ({ title }))
  const categoriesLens = lens.reflect(({ categories }) => ({ categories }))
  const contentLens = lens.reflect(({ content }) => ({ content }))

  return (
    <VStack>
      <TitleInput lens={titleLens} />
      <CategoriesInput
        lens={categoriesLens}
        categoryOptions={categoryOptions}
      />
      <ContentInput lens={contentLens} />
    </VStack>
  )
}

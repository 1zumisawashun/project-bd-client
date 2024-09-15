'use client'

import { VStack } from '@/components/elements/VStack'
import {
  Form,
  FormErrorMessage,
  FormField,
  FormLabel,
} from '@/components/forms/Form'
import { Controller, useFormContext } from 'react-hook-form'
import { TextInput } from '@/components/forms/TextInput'
import styles from '@/components/layouts/SiteWrapper/index.module.scss'
import { Footer } from '@/components/layouts/Footer'
import { Schema } from './articleEdit.schema'
import { ArticleEditor } from '../components/ArticleEditor'
import { ArticleEditHeader } from './components/ArticleEditHeader'
import { ArticleEditProvider } from './components/ArticleEditProvider'

const BLOCK_NAME = 'site-wrapper'
type Props = {
  articleId: string
  defaultValues: Schema
}
export const ArticleEdit: React.FC<Props> = ({ articleId, defaultValues }) => {
  return (
    <ArticleEditProvider defaultValues={defaultValues}>
      <div className={styles[`${BLOCK_NAME}`]}>
        <ArticleEditHeader articleId={articleId} />
        <main className={styles[`${BLOCK_NAME}-inner`]}>
          <ArticleEditForm />
        </main>
        <Footer />
      </div>
    </ArticleEditProvider>
  )
}

export const ArticleEditForm: React.FC = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<Schema>()

  return (
    <VStack>
      <Form>
        <FormField name="title" serverInvalid={!!errors.title}>
          <FormLabel>Title</FormLabel>
          <TextInput {...register('title')} />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormField>

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <ArticleEditor onChange={field.onChange} value={field.value} />
          )}
        />
      </Form>
    </VStack>
  )
}

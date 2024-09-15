'use client'

import {
  Form,
  FormErrorMessage,
  FormField,
  FormLabel,
} from '@/components/forms/Form'
import { Controller, useFormContext } from 'react-hook-form'
import { TextInput } from '@/components/forms/TextInput'
import { Schema } from '../articleEdit.schema'
import { ArticleEditor } from '../../components/ArticleEditor'

export const ArticleEditForm: React.FC = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<Schema>()

  return (
    <Form>
      <FormField name="title" serverInvalid={!!errors.title}>
        <FormLabel>Title</FormLabel>
        <TextInput {...register('title')} />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
      </FormField>

      <FormField name="content" serverInvalid={!!errors.content}>
        <FormLabel>Content</FormLabel>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <ArticleEditor onChange={field.onChange} value={field.value} />
          )}
        />
        <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
      </FormField>
    </Form>
  )
}

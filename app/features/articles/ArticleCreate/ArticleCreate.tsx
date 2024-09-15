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
import { Schema } from './articleCreate.schema'
import { ArticleEditor } from '../components/ArticleEditor'

export const ArticleCreate: React.FC = () => {
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

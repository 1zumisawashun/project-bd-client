'use client'

import { Button } from '@/components/buttons/Button'
import { VStack } from '@/components/elements/VStack'
import { HStack } from '@/components/elements/HStack'
import {
  Form,
  FormErrorMessage,
  FormField,
  FormLabel,
} from '@/components/forms/Form'
import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from '@/components/forms/TextInput'
import { startTransition } from 'react'
import { useRouter } from 'next/navigation'
import { schema, Schema } from './articleCreate.schema'
import { ArticleCreateEditor } from './components/ArticleCreateEditor'
import { createArticle } from './articleCreate.action'

export const ArticleCreate: React.FC = () => {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    startTransition(async () => {
      const response = await createArticle(data)

      if (!response?.isSuccess) {
        return
      }
      // NOTE: 詳細画面に飛ばす
      router.push('/')
    })
  }

  const onError: SubmitErrorHandler<Schema> = (error) => console.error(error)

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
            <ArticleCreateEditor
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </Form>

      <HStack justify="end">
        <Button onClick={handleSubmit(onSubmit, onError)}>投稿する</Button>
      </HStack>
    </VStack>
  )
}

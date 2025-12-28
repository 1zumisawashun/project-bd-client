'use client'

import { Button } from '@/components/buttons/Button'
import { Card, CardBody } from '@/components/elements/Card'
import { Link } from '@/components/elements/Link'
import { SimpleDialog } from '@/components/elements/SimpleDialog'
import { Field, FieldError, FieldLabel } from '@/components/forms/Field'
import { TextInput } from '@/components/forms/TextInput'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { signIn } from './signIn.action'
import { schema, Schema } from './signIn.schema'

export const SignIn: React.FC = () => {
  const dialog = useDisclosure()
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState('')

  const { control, handleSubmit } = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<Schema> = (data) => {
    startTransition(async () => {
      const response = await signIn({ data })

      if (!response?.isSuccess) {
        setErrorMessage(response.error.message)
        dialog.open()
        return
      }

      router.push('/')
    })
  }

  const onError: SubmitErrorHandler<Schema> = (error) => console.error(error)

  return (
    <>
      <Card>
        <CardBody>
          <h1 style={{ fontSize: '1.5rem' }}>project-bd へようこそ</h1>
          <VStack>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <Field invalid={invalid}>
                  <FieldLabel>メールアドレス</FieldLabel>
                  <TextInput type="email" {...field} />
                  <FieldError match={!!error}>{error?.message}</FieldError>
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <Field invalid={invalid}>
                  <FieldLabel>パスワード</FieldLabel>
                  <TextInput {...field} />
                  <FieldError match={!!error}>{error?.message}</FieldError>
                </Field>
              )}
            />
          </VStack>
          <HStack style={{ justifyContent: 'space-between' }}>
            <HStack>
              <Link href="/sign-up">新規登録はこちら</Link>
            </HStack>
            <Button onClick={(e) => void handleSubmit(onSubmit, onError)(e)}>
              ログイン
            </Button>
          </HStack>
        </CardBody>
      </Card>

      <SimpleDialog
        isOpen={dialog.isOpen}
        close={dialog.close}
        title="ログインに失敗しました"
        description={errorMessage}
      />
    </>
  )
}

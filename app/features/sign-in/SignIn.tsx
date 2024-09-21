'use client'

import { Card, CardBody } from '@/components/elements/Card'
import {
  Form,
  FormErrorMessage,
  FormField,
  FormLabel,
} from '@/components/forms/Form'
import { Button } from '@/components/buttons/Button'
import { Link } from '@/components/elements/Link'
import { TextInput } from '@/components/forms/TextInput'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { startTransition, useState } from 'react'
import { SimpleDialog } from '@/components/elements/SimpleDialog'
import { useRouter } from 'next/navigation'
import { HStack } from '@/components/layouts/HStack'
import { signIn } from './signIn.action'
import { schema, Schema } from './signIn.schema'

export const SignIn: React.FC = () => {
  const dialog = useDisclosure()
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    startTransition(async () => {
      const response = await signIn(data)

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
          <Form>
            <FormField name="email" serverInvalid={!!errors.email}>
              <FormLabel>メールアドレス</FormLabel>
              <TextInput type="email" {...register('email')} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormField>

            <FormField name="password" serverInvalid={!!errors.password}>
              <FormLabel>パスワード</FormLabel>
              <TextInput {...register('password')} />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormField>
          </Form>
          <HStack style={{ justifyContent: 'space-between' }}>
            <HStack>
              <Link href="/sign-up">新規登録はこちら</Link>
            </HStack>
            <Button onClick={handleSubmit(onSubmit, onError)}>ログイン</Button>
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

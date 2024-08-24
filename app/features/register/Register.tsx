'use client'

import { Card, CardBody } from '@/components/elements/Card'
import {
  Form,
  FormErrorMessage,
  FormField,
  FormLabel,
} from '@/components/forms/Form'
import { Button } from '@/components/buttons/Button'
import { AnchorButton } from '@/components/buttons/AnchorButton'
import { TextInput } from '@/components/forms/TextInput'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Nl2br } from '@/components/elements/Nl2br'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { startTransition, useState } from 'react'
import { SimpleDialog } from '@/components/elements/SimpleDialog'
import { tos } from '../tos/Tos.constant'
import { schema, Schema } from './Register.schema'
import { signup } from './Register.action'

export const Register: React.FC = () => {
  const dialog = useDisclosure()
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
      const response = await signup(data)
      if (!response?.isSuccess) {
        setErrorMessage(response.error.message)
        dialog.open()
      }
    })
  }

  const onError: SubmitErrorHandler<Schema> = (error) => console.error(error)

  return (
    <>
      <Card>
        <CardBody>
          <h1 style={{ fontSize: '1.5rem' }}>project-bd-client</h1>
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
          <Card scrollable style={{ height: '150px' }}>
            <CardBody>
              <Nl2br>{tos}</Nl2br>
            </CardBody>
          </Card>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <AnchorButton variant="outlined" href="#" disabled>
                パスワード忘れ
              </AnchorButton>
              <AnchorButton variant="outlined" href="/login">
                ログイン
              </AnchorButton>
            </div>
            <Button onClick={handleSubmit(onSubmit, onError)}>新規登録</Button>
          </div>
        </CardBody>
      </Card>
      <SimpleDialog
        isOpen={dialog.isOpen}
        close={dialog.close}
        title="サインアップに失敗しました"
        description={errorMessage}
      />
    </>
  )
}

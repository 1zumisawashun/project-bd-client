'use client'

import { Button } from '@/components/buttons/Button'
import { Card, CardBody } from '@/components/elements/Card'
import { useToastDispatch } from '@/components/elements/Toast'
import { Description, Title } from '@/components/elements/Typography'
import { Field, FieldError, FieldLabel } from '@/components/forms/Field'
import { TextInput } from '@/components/forms/TextInput'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { User } from '@/functions/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { updateEmail } from './myPageEmail.action'
import { EmailSchema, emailSchema } from './myPageEmail.schema'

const EmailPreview: React.FC<{ email: string; open: () => void }> = ({
  email,
  open,
}) => {
  return (
    <VStack>
      <p>現在のメールアドレス: {email}</p>
      <HStack>
        <Button onClick={open}>変更する</Button>
      </HStack>
    </VStack>
  )
}

const EmailEditForm: React.FC<{ email: string; close: () => void }> = ({
  email,
  close,
}) => {
  const router = useRouter()
  const openToast = useToastDispatch()

  const { control, handleSubmit } = useForm<EmailSchema>({
    mode: 'onTouched',
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email,
    },
  })

  const onSubmit: SubmitHandler<EmailSchema> = (data) => {
    startTransition(async () => {
      const response = await updateEmail({ data })

      if (!response?.isSuccess) {
        openToast({
          theme: 'danger',
          title: 'エラーが発生しました',
          description: response.error.message ?? 'エラーが発生しました',
        })
        return
      }
      openToast({
        theme: 'success',
        title: '成功しました',
        description: response.message ?? '成功しました',
      })

      router.refresh()
      close()
    })
  }

  const onError: SubmitErrorHandler<EmailSchema> = (error) => {
    openToast({
      theme: 'danger',
      title: 'エラーが発生しました',
      description: JSON.stringify(error, null, 2),
    })
  }

  return (
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
      <HStack>
        <Button onClick={close}>キャンセル</Button>
        <Button onClick={(e) => void handleSubmit(onSubmit, onError)(e)}>
          変更する
        </Button>
      </HStack>
    </VStack>
  )
}

export const MyPageEmail: React.FC<{ user: User }> = ({ user }) => {
  const { isOpen, open, close } = useDisclosure()
  const email = user.email ?? ''

  return (
    <Card>
      <CardBody>
        <VStack gap={2}>
          <Title>メールアドレスを変更する</Title>
          <Description>
            登録されているメールアドレスを変更できます。新しいメールアドレスを入力してください。
          </Description>
        </VStack>
        {isOpen ? (
          <EmailEditForm email={email} close={close} />
        ) : (
          <EmailPreview email={email} open={open} />
        )}
      </CardBody>
    </Card>
  )
}

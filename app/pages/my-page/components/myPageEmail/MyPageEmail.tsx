'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FC, startTransition } from 'react'
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { Button } from '@/components/buttons/Button'
import { Card, CardBody } from '@/components/elements/Card'
import { useToast } from '@/components/elements/Toast'
import { Description, Title } from '@/components/elements/Typography'
import { Field, FieldError, FieldLabel } from '@/components/forms/Field'
import { TextInput } from '@/components/forms/TextInput'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { updateEmail } from './myPageEmail.action'
import { Schema, schema } from './myPageEmail.schema'

type EmailPreviewProps = {
  email: string | null
  open: () => void
}

const EmailPreview: FC<EmailPreviewProps> = ({ email, open }) => {
  return (
    <VStack>
      <p>現在のメールアドレス: {email ?? '未設定'}</p>
      <HStack>
        <Button onClick={open}>変更する</Button>
      </HStack>
    </VStack>
  )
}

type EmailEditFormProps = {
  email: string | null
  close: () => void
}

const EmailEditForm: FC<EmailEditFormProps> = ({ email, close }) => {
  const router = useRouter()
  const toast = useToast()

  const { control, handleSubmit } = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      email: email ?? '',
    },
  })

  const onSubmit: SubmitHandler<Schema> = (data) => {
    startTransition(async () => {
      const response = await updateEmail({ data })

      if (!response?.isSuccess) {
        toast.add({
          title: 'エラーが発生しました',
          description: response.error.message ?? 'エラーが発生しました',
        })
        return
      }
      toast.add({
        title: '成功しました',
        description: response.message ?? '成功しました',
      })

      router.refresh()
      close()
    })
  }

  const onError: SubmitErrorHandler<Schema> = (error) => {
    toast.add({
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

type MyPageEmailProps = {
  email: string | null
}

export const MyPageEmail: FC<MyPageEmailProps> = ({ email }) => {
  const { isOpen, open, close } = useDisclosure()

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

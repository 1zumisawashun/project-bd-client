'use client'

import { Button } from '@/components/buttons/Button'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { Card, CardBody } from '@/components/elements/Card'
import { HStack } from '@/components/layouts/HStack'
import { TextInput } from '@/components/forms/TextInput'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormErrorMessage,
  FormLabel,
} from '@/components/forms/Form'
import { VStack } from '@/components/layouts/VStack'
import { startTransition } from 'react'
import { Title, Description } from '@/components/elements/Typography'
import { User } from '@/functions/types'
import { useRouter } from 'next/navigation'
import { useToastDispatch } from '@/components/elements/Toast'
import { EmailSchema, emailSchema } from '../myPageSetting.schema'
import { updateEmail } from '../myPageSetting.action'

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSchema>({
    mode: 'onTouched',
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email,
    },
  })

  const onSubmit: SubmitHandler<EmailSchema> = async (data) => {
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
      <Form>
        <FormField name="email" serverInvalid={!!errors.email}>
          <FormLabel>メールアドレス</FormLabel>
          <TextInput {...register('email')} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormField>
      </Form>
      <HStack>
        <Button onClick={close}>キャンセル</Button>
        <Button onClick={handleSubmit(onSubmit, onError)}>変更する</Button>
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
            メールアドレスを変更するメールアドレスを変更するメールアドレスを変更するメールアドレスを変更するメールアドレスを変更する
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

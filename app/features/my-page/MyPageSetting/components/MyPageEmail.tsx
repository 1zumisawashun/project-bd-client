'use client'

import { Button } from '@/components/buttons/Button'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { Card, CardBody } from '@/components/elements/Card'
import { HStack } from '@/components/elements/HStack'
import { TextInput } from '@/components/forms/TextInput'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormErrorMessage,
  FormLabel,
} from '@/components/forms/Form'
import { VStack } from '@/components/elements/VStack'
import { startTransition } from 'react'
import { Title } from './Title'
import { Description } from './Description'
import { EmailSchema, emailSchema } from '../myPageSetting.schema'
import { updateEmail } from '../myPageSetting.action'
import { User } from '../../myPage.type'

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
      const response = await updateEmail(data)

      if (!response?.isSuccess) {
        // toast
        return
      }
      // toast
      close()
    })
  }

  const onError: SubmitErrorHandler<EmailSchema> = (error) =>
    console.error(error)

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

  return (
    <Card>
      <CardBody>
        <Title>メールアドレスを変更する</Title>
        <Description>
          メールアドレスを変更するメールアドレスを変更するメールアドレスを変更するメールアドレスを変更するメールアドレスを変更する
        </Description>
        {isOpen ? (
          <EmailEditForm email={user.email ?? ''} close={close} />
        ) : (
          <EmailPreview email={user.email ?? ''} open={open} />
        )}
      </CardBody>
    </Card>
  )
}

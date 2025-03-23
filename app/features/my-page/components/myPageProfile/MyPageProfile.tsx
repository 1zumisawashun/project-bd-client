'use client'

import { Button } from '@/components/buttons/Button'
import { Card, CardBody } from '@/components/elements/Card'
import { useToastDispatch } from '@/components/elements/Toast'
import { Description, Title } from '@/components/elements/Typography'
import {
  Form,
  FormErrorMessage,
  FormField,
  FormLabel,
} from '@/components/forms/Form'
import { TextInput } from '@/components/forms/TextInput'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { User } from '@/functions/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { updateProfile } from './myPageProfile.action'
import { ProfileSchema, profileSchema } from './myPageProfile.schema'

const ProfilePreview: React.FC<{ name: string; open: () => void }> = ({
  name,
  open,
}) => {
  return (
    <VStack>
      <p>現在の名前: {name}</p>
      <HStack>
        <Button onClick={open}>変更する</Button>
      </HStack>
    </VStack>
  )
}

const ProfileEditForm: React.FC<{
  name: string
  close: () => void
}> = ({ name, close }) => {
  const router = useRouter()
  const openToast = useToastDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchema>({
    mode: 'onTouched',
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name,
    },
  })

  const onSubmit: SubmitHandler<ProfileSchema> = (data) => {
    startTransition(async () => {
      const response = await updateProfile({ data })

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

  const onError: SubmitErrorHandler<ProfileSchema> = (error) => {
    openToast({
      theme: 'danger',
      title: 'エラーが発生しました',
      description: JSON.stringify(error, null, 2),
    })
  }

  return (
    <VStack>
      <Form>
        <FormField name="name" serverInvalid={!!errors.name}>
          <FormLabel>名前</FormLabel>
          <TextInput {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormField>
      </Form>

      <HStack>
        <Button onClick={close}>キャンセル</Button>
        <Button onClick={(e) => void handleSubmit(onSubmit, onError)(e)}>
          変更する
        </Button>
      </HStack>
    </VStack>
  )
}

export const MyPageProfile: React.FC<{ user: User }> = ({ user }) => {
  const { isOpen, open, close } = useDisclosure()
  const name = user.name ?? '名無し'

  return (
    <Card>
      <CardBody>
        <VStack gap={2}>
          <Title>プロフィールを変更する</Title>
          <Description>
            現在の名前を編集して、新しい名前に変更できます。
          </Description>
        </VStack>
        {isOpen ? (
          <ProfileEditForm name={name} close={close} />
        ) : (
          <ProfilePreview name={name} open={open} />
        )}
      </CardBody>
    </Card>
  )
}

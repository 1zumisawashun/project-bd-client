'use client'

import { Button } from '@/components/buttons/Button'
import { Card, CardBody } from '@/components/elements/Card'
import { useToast } from '@/components/elements/Toast'
import { Description, Title } from '@/components/elements/Typography'
import { Field, FieldError, FieldLabel } from '@/components/forms/Field'
import { TextInput } from '@/components/forms/TextInput'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FC, startTransition } from 'react'
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { updateProfile } from './myPageProfile.action'
import { Schema, schema } from './myPageProfile.schema'

type ProfilePreviewProps = {
  name: string | null
  open: () => void
}

const ProfilePreview: FC<ProfilePreviewProps> = ({ name, open }) => {
  return (
    <VStack>
      <p>現在の名前: {name ?? '未設定'}</p>
      <HStack>
        <Button onClick={open}>変更する</Button>
      </HStack>
    </VStack>
  )
}

type ProfileEditFormProps = {
  name: string | null
  close: () => void
}

const ProfileEditForm: FC<ProfileEditFormProps> = ({ name, close }) => {
  const router = useRouter()
  const toast = useToast()

  const { control, handleSubmit } = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      name: name ?? '',
    },
  })

  const onSubmit: SubmitHandler<Schema> = (data) => {
    startTransition(async () => {
      const response = await updateProfile({ data })

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
        name="name"
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <Field invalid={invalid}>
            <FieldLabel>名前</FieldLabel>
            <TextInput {...field} />
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

type MyPageProfileProps = {
  name: string | null
}

export const MyPageProfile: FC<MyPageProfileProps> = ({ name }) => {
  const { isOpen, open, close } = useDisclosure()

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

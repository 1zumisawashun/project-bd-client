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
import { ProfileSchema, profileSchema } from '../myPageSetting.schema'
import { updateProfile } from '../myPageSetting.action'
import { User } from '../../myPage.type'

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

  const onSubmit: SubmitHandler<ProfileSchema> = async (data) => {
    startTransition(async () => {
      console.log('submit')
      const response = await updateProfile(data)

      if (!response?.isSuccess) {
        // toast
        return
      }
      // toast
      close()
    })
  }

  const onError: SubmitErrorHandler<ProfileSchema> = (error) =>
    console.error(error)

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
        <Button onClick={handleSubmit(onSubmit, onError)}>変更する</Button>
      </HStack>
    </VStack>
  )
}

export const MyPageProfile: React.FC<{ user: User }> = ({ user }) => {
  const { isOpen, open, close } = useDisclosure()

  return (
    <Card>
      <CardBody>
        <Title>プロフィールを変更する</Title>
        <Description>
          プロフィールを変更するプロフィールを変更するプロフィールを変更するプロフィールを変更するプロフィールを変更するプロフィールを変更する
        </Description>
        {isOpen ? (
          <ProfileEditForm name={user.name ?? '名無し'} close={close} />
        ) : (
          <ProfilePreview name={user.name ?? '名無し'} open={open} />
        )}
      </CardBody>
    </Card>
  )
}

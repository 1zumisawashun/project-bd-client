'use client'

import { useLens } from '@hookform/lenses'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, startTransition, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/buttons/Button'
import { Card, CardBody } from '@/components/elements/Card'
import { Link } from '@/components/elements/Link'
import { SimpleDialog } from '@/components/elements/SimpleDialog'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { EmailInput } from '@/features/authentication/emailInput/EmailInput'
import { PasswordInput } from '@/features/authentication/passwordInput/PasswordInput'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { signIn } from './signIn.action'
import { schema, Schema } from './signIn.schema'

export const SignIn: FC = () => {
  const dialog = useDisclosure()

  const [errorMessage, setErrorMessage] = useState('')

  const { handleSubmit, control } = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const lens = useLens<Schema>({ control })

  const emailLens = lens.reflect(({ email }) => ({ email }))
  const passwordLens = lens.reflect(({ password }) => ({ password }))

  const onSubmit: SubmitHandler<Schema> = (data) => {
    startTransition(async () => {
      const response = await signIn({ provider: 'credentials', ...data })

      if (response?.error) {
        setErrorMessage(response?.error?.message ?? 'ログインに失敗しました')
        dialog.open()
      }
    })
  }

  const onError: SubmitErrorHandler<Schema> = (error) => console.error(error)

  const handleGitHubSignIn = () => {
    startTransition(async () => {
      const response = await signIn({ provider: 'github' })

      if (response?.error) {
        setErrorMessage(response?.error?.message ?? 'ログインに失敗しました')
        dialog.open()
      }
    })
  }

  return (
    <>
      <Card>
        <CardBody>
          <h1 style={{ fontSize: '1.5rem' }}>project-bd へようこそ</h1>
          <VStack>
            <EmailInput lens={emailLens} />
            <PasswordInput lens={passwordLens} />
          </VStack>
          <HStack style={{ justifyContent: 'space-between' }}>
            <HStack>
              <Link href="/sign-up">新規登録はこちら</Link>
            </HStack>
            <HStack>
              <Button onClick={handleGitHubSignIn}>Sign in with GitHub</Button>
              <Button onClick={(e) => void handleSubmit(onSubmit, onError)(e)}>
                ログイン
              </Button>
            </HStack>
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

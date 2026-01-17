'use client'

import { useLens } from '@hookform/lenses'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FC, startTransition, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/buttons/Button'
import { Card, CardBody } from '@/components/elements/Card'
import { Link } from '@/components/elements/Link'
import { Nl2br } from '@/components/elements/Nl2br'
import { SimpleDialog } from '@/components/elements/SimpleDialog'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { EmailInput } from '@/features/authentication/emailInput/EmailInput'
import { PasswordInput } from '@/features/authentication/passwordInput/PasswordInput'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { TOS } from '../tos/tos.constants'
import { AgreementCheckbox } from './components/agreementCheckbox/AgreementCheckbox'
import { signUp } from './signUp.action'
import { schema, Schema } from './signUp.schema'

export const SignUp: FC = () => {
  const dialog = useDisclosure()
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState('')

  const { control, handleSubmit } = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      agreement: false,
    },
  })

  const lens = useLens<Schema>({ control })

  const emailLens = lens.reflect(({ email }) => ({ email }))
  const passwordLens = lens.reflect(({ password }) => ({ password }))
  const agreementLens = lens.reflect(({ agreement }) => ({ agreement }))

  const onSubmit: SubmitHandler<Schema> = (data) => {
    startTransition(async () => {
      const response = await signUp({ data })

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
          <VStack>
            <EmailInput lens={emailLens} />
            <PasswordInput lens={passwordLens} />
          </VStack>
          <Card scrollable style={{ height: '150px' }}>
            <CardBody>
              <Nl2br>{TOS}</Nl2br>
            </CardBody>
          </Card>

          <AgreementCheckbox lens={agreementLens} />

          <HStack style={{ justifyContent: 'space-between' }}>
            <HStack>
              <Link href="/sign-in">ログインはこちら</Link>
            </HStack>
            <Button onClick={(e) => void handleSubmit(onSubmit, onError)(e)}>
              新規登録
            </Button>
          </HStack>
        </CardBody>
      </Card>

      <SimpleDialog
        isOpen={dialog.isOpen}
        close={dialog.close}
        title="新規登録に失敗しました"
        description={errorMessage}
      />
    </>
  )
}

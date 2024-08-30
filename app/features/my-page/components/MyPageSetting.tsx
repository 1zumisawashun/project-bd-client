'use client'

import { Button } from '@/components/buttons/Button'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { Card, CardBody } from '@/components/elements/Card'
import { LogoutDialog } from './LogoutDialog'
import styles from '../MyPage.module.scss'

const BLOCK_NAME = 'my-page-setting'

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h2 className={styles[`${BLOCK_NAME}-title`]}>{children}</h2>
}
const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className={styles[`${BLOCK_NAME}-description`]}>{children}</p>
}
export const MyPageSetting: React.FC = () => {
  const dialog = useDisclosure()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Card>
        <CardBody>
          <Title>プロフィールを変更する</Title>
          <Description>
            プロフィールを変更するプロフィールを変更するプロフィールを変更するプロフィールを変更するプロフィールを変更する
          </Description>
          <div>
            <Button onClick={dialog.open}>変更する</Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Title>メールアドレスを変更する</Title>
          <Description>
            メールアドレスを変更するメールアドレスを変更するメールアドレスを変更するメールアドレスを変更するメールアドレスを変更する
          </Description>
          <div>
            <Button onClick={dialog.open}>変更する</Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Title>ログアウトする</Title>
          <Description>
            ログアウトするログアウトするログアウトするログアウトするログアウトするログアウトする
          </Description>
          <div>
            <Button onClick={dialog.open}>ログアウトする</Button>
          </div>
        </CardBody>
      </Card>
      <LogoutDialog isOpen={dialog.isOpen} close={dialog.close} />
    </div>
  )
}

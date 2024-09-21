import { AnchorButton } from '@/components/buttons/AnchorButton'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { Description } from '@/components/elements/Typography'
import styles from './topPage.module.scss'

const BLOCK_NAME = 'top-page'
export const TopPage: React.FC = () => {
  return (
    <VStack gap={6} style={{ paddingTop: '2rem' }}>
      <h2 className={styles[`${BLOCK_NAME}-sub-title`]}>
        サブタイトルサブタイトルサブタイトルサブタイトルサブタイトルサブタイトルサブタイトル
      </h2>
      <h1 className={styles[`${BLOCK_NAME}-title`]}>Project-BD</h1>
      <Description className={styles[`${BLOCK_NAME}-description`]}>
        ディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプション
      </Description>
      <Description className={styles[`${BLOCK_NAME}-description`]}>
        ディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプション
      </Description>
      <HStack>
        <AnchorButton href="/articles/create" variant="outlined">
          Add New
        </AnchorButton>
        <AnchorButton href="/articles" variant="outlined">
          View List
        </AnchorButton>
      </HStack>
    </VStack>
  )
}

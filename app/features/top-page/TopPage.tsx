import { AnchorButton } from '@/components/buttons/AnchorButton'
import { HStack } from '@/components/elements/HStack'
import { VStack } from '@/components/elements/VStack'
import styles from './TopPage.module.scss'

const BLOCK_NAME = 'top-page'
export const TopPage: React.FC = () => {
  return (
    <VStack gap={6} style={{ paddingTop: '2rem' }}>
      <h2 className={styles[`${BLOCK_NAME}-sub-title`]}>
        サブタイトルサブタイトルサブタイトルサブタイトルサブタイトルサブタイトルサブタイトル
      </h2>
      <h1 className={styles[`${BLOCK_NAME}-title`]}>Project-BD</h1>
      <p className={styles[`${BLOCK_NAME}-description`]}>
        ディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプション
      </p>
      <p className={styles[`${BLOCK_NAME}-description`]}>
        ディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプション
      </p>
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

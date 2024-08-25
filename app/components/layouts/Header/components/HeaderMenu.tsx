import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '../../../elements/DropdownMenu'
import { IconButton } from '../../../buttons/IconButton'
import { AnchorButton } from '../../../buttons/AnchorButton'
import styles from '../index.module.scss'

const BLOCK_NAME = 'header-menu'
export const HeaderMenu: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton variant="ghost">
          <HamburgerMenuIcon />
        </IconButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <AnchorButton
          variant="ghost"
          href="/tos"
          className={styles[`${BLOCK_NAME}-anchor-button`]}
        >
          利用規約
        </AnchorButton>
        <AnchorButton
          variant="ghost"
          href="/faq"
          className={styles[`${BLOCK_NAME}-anchor-button`]}
        >
          FAQ
        </AnchorButton>
        <AnchorButton
          variant="ghost"
          href="/sign-in"
          className={styles[`${BLOCK_NAME}-anchor-button`]}
        >
          ログイン
        </AnchorButton>
        <AnchorButton
          variant="ghost"
          href="/sign-up"
          className={styles[`${BLOCK_NAME}-anchor-button`]}
        >
          新規登録
        </AnchorButton>
        <AnchorButton
          variant="ghost"
          href="/articles"
          className={styles[`${BLOCK_NAME}-anchor-button`]}
        >
          記事一覧
        </AnchorButton>
        <AnchorButton
          variant="ghost"
          href="/articles/create"
          className={styles[`${BLOCK_NAME}-anchor-button`]}
        >
          記事作成
        </AnchorButton>
        <AnchorButton
          variant="ghost"
          href="/my-page/setting"
          className={styles[`${BLOCK_NAME}-anchor-button`]}
        >
          マイページ
        </AnchorButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

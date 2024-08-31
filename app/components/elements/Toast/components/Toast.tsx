import * as RowToast from '@radix-ui/react-toast'
import { IconButton } from '@/components/buttons/IconButton'
import { Cross1Icon } from '@radix-ui/react-icons'
import styles from '../index.module.scss'
import { Toast as ToastType } from '../../elements.type'

const BLOCK_NAME = 'toast'
type Props = {
  value: ToastType
  onClose: (id: string) => void
}
export const Toast: React.FC<Props> = ({ value, onClose }) => {
  return (
    <RowToast.Root
      className={styles[`${BLOCK_NAME}`]}
      open={value.isOpen}
      onOpenChange={(isOpen) => !isOpen && onClose(value.id)}
      data-theme={value.theme}
    >
      <RowToast.Title className={styles[`${BLOCK_NAME}-title`]}>
        {value.title}
      </RowToast.Title>
      <RowToast.Description className={styles[`${BLOCK_NAME}-description`]}>
        {value.description}
      </RowToast.Description>

      {/* NOTE: Toast.Closeで閉じることができるがActionで閉じることもできる */}
      <RowToast.Action
        className={styles[`${BLOCK_NAME}-action`]}
        asChild
        altText="Goto schedule to undo"
      >
        <IconButton
          onClick={() => onClose(value.id)}
          shape="circle"
          theme={value.theme}
        >
          <Cross1Icon />
        </IconButton>
      </RowToast.Action>
    </RowToast.Root>
  )
}

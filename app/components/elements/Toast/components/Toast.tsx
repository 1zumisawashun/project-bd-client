import { Toast as RowToast } from '@base-ui/react/toast'
import { FC } from 'react'
import { XIcon } from '../../Icon'
import styles from '../index.module.css'

const BLOCK_NAME = 'toast'

export const Toast: FC = () => {
  const { toasts } = RowToast.useToastManager()

  return toasts.map((toast) => (
    <RowToast.Root
      key={toast.id}
      toast={toast}
      swipeDirection="up"
      className={styles[`${BLOCK_NAME}`]!}
    >
      <RowToast.Content className={styles[`${BLOCK_NAME}-content`]!}>
        <RowToast.Title className={styles[`${BLOCK_NAME}-title`]!} />
        <RowToast.Description
          className={styles[`${BLOCK_NAME}-description`]!}
        />
        <RowToast.Close
          className={styles[`${BLOCK_NAME}-close`]!}
          aria-label="Close"
        >
          <XIcon />
        </RowToast.Close>
      </RowToast.Content>
    </RowToast.Root>
  ))
}

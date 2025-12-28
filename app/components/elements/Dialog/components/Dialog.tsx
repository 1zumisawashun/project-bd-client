import { Dialog as RowDialog } from '@base-ui/react/dialog'
import { ComponentProps, FC, PropsWithChildren } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'dialog'

type DialogProps = ComponentProps<typeof RowDialog.Root>

type CustomProps = {}

type Props = DialogProps & CustomProps

export const Dialog: FC<PropsWithChildren<Props>> = ({
  // native props
  children,
  // other props
  ...props
}) => {
  return (
    <RowDialog.Root {...props}>
      <RowDialog.Portal>
        <RowDialog.Backdrop className={styles[`${BLOCK_NAME}-backdrop`]!} />
        <RowDialog.Popup className={styles[`${BLOCK_NAME}-popup`]!}>
          {children}
        </RowDialog.Popup>
      </RowDialog.Portal>
    </RowDialog.Root>
  )
}

Dialog.displayName = 'Dialog'

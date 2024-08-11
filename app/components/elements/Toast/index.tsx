import * as RowToast from '@radix-ui/react-toast'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import styles from './index.module.scss'
import { Button } from '../../buttons/Button'

export const Toast = <
  T extends Pick<ReturnType<typeof useDisclosure>, 'isOpen' | 'close'>,
>({
  isOpen,
  close,
}: T) => {
  return (
    <RowToast.Provider swipeDirection="right">
      <RowToast.Root
        className={styles['ToastRoot']}
        open={isOpen}
        onOpenChange={() => close()}
      >
        <RowToast.Title className={styles['ToastTitle']}>
          Scheduled: Catch up
        </RowToast.Title>
        <RowToast.Description asChild>Hello World</RowToast.Description>
        <RowToast.Action
          className={styles['ToastAction']}
          asChild
          altText="Goto schedule to undo"
        >
          <Button onClick={() => close()}>Undo</Button>
        </RowToast.Action>
      </RowToast.Root>
      <RowToast.Viewport className={styles['ToastViewport']} />
    </RowToast.Provider>
  )
}

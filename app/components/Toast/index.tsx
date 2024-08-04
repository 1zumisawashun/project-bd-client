/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import * as RowToast from '@radix-ui/react-toast'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import styles from './index.module.scss'
import { Button } from '../Button'

export const Toast = <
  T extends Pick<ReturnType<typeof useDisclosure>, 'isOpen' | 'setIsOpen'>,
>({
  isOpen,
  setIsOpen,
}: T) => {
  return (
    <RowToast.Provider swipeDirection="right">
      <RowToast.Root
        className={styles['ToastRoot']}
        open={isOpen}
        onOpenChange={setIsOpen}
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
          <Button onClick={() => setIsOpen(false)}>Undo</Button>
        </RowToast.Action>
      </RowToast.Root>
      <RowToast.Viewport className={styles['ToastViewport']} />
    </RowToast.Provider>
  )
}

'use client'

import * as RowToast from '@radix-ui/react-toast'
import { useToast } from '../hooks/useToast'
import styles from '../index.module.css'
import { Toast } from './Toast'
import { ToastDispatchProvider } from './ToastDispatchProvider'

const BLOCK_NAME = 'toast'
export const ToastProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { toasts, openToast, closeToast } = useToast()

  return (
    <ToastDispatchProvider value={openToast}>
      <RowToast.Provider duration={3000}>
        {children}
        {toasts.map((value) => (
          <Toast key={value.id} value={value} onClose={closeToast} />
        ))}
        <RowToast.Viewport className={styles[`${BLOCK_NAME}-viewport`]} />
      </RowToast.Provider>
    </ToastDispatchProvider>
  )
}

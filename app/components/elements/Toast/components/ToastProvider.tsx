import * as RowToast from '@radix-ui/react-toast'

import { ToastDispatchProvider } from './ToastDispatchProvider'
import { Toast } from './Toast'
import { useToast } from '../hooks/useToast'
import styles from '../index.module.scss'

const BLOCK_NAME = 'toast'
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
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

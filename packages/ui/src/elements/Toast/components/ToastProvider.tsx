'use client'

import { Toast as RowToast } from '@base-ui/react/toast'
import { FC, PropsWithChildren } from 'react'
import styles from '../index.module.css'
import { Toast } from './Toast'

const BLOCK_NAME = 'toast'

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <RowToast.Provider>
      {children}
      <RowToast.Portal>
        <RowToast.Viewport className={styles[`${BLOCK_NAME}-viewport`]!}>
          <Toast />
        </RowToast.Viewport>
      </RowToast.Portal>
    </RowToast.Provider>
  )
}

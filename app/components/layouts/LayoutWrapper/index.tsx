'use client'

import { useState } from 'react'
import styles from './index.module.css'

const BLOCK_NAME = 'layout-wrapper'

// NOTE: SiteWrapper と同じように、ページの高さを調整するコンポーネント
export const LayoutWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [top, setTop] = useState(0)

  return (
    <main
      ref={(node) => {
        if (!node) return
        setTop(node.getBoundingClientRect().top ?? 0)
      }}
      style={{ minHeight: `calc(100vh - ${top}px)` }}
      className={styles[BLOCK_NAME]}
    >
      {children}
    </main>
  )
}

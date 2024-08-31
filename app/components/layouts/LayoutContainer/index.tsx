'use client'

import { useState } from 'react'
import styles from './index.module.scss'

const BLOCK_NAME = 'layout-container'

// NOTE: SiteWrapper と同じように、ページの高さを調整するコンポーネント
export const LayoutContainer: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
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

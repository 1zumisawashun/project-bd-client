'use client'

import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from 'react'
import styles from './index.module.css'

const BLOCK_NAME = 'layout-wrapper'

type StickyWrapperProps = ComponentPropsWithoutRef<'main'>

type CustomProps = {}

type Props = StickyWrapperProps & CustomProps

type Ref = ElementRef<'main'>

/**
 * NOTE:
 * SiteWrapper と同じように、ページの高さを調整するコンポーネント
 */
export const LayoutWrapper = forwardRef<Ref, Props>(({ children }, ref) => {
  const [top, setTop] = useState(0)

  return (
    <main
      ref={(node) => {
        if (!node) return
        setTop(node.getBoundingClientRect().top ?? 0)

        // NOTE: 親コンポーネントからのrefがある場合は、それも適用する
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      }}
      style={{ minHeight: `calc(100vh - ${top}px)` }}
      className={styles[BLOCK_NAME]}
    >
      {children}
    </main>
  )
})

LayoutWrapper.displayName = 'LayoutWrapper'

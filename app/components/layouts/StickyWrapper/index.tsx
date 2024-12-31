import clsx from 'clsx'
import {
  useState,
  forwardRef,
  ElementRef,
  ComponentPropsWithoutRef,
} from 'react'
import styles from './index.module.scss'

const BLOCK_NAME = 'sticky-wrapper'
type Props = {} & ComponentPropsWithoutRef<'div'>
type Ref = ElementRef<'div'>
export const StickyWrapper = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    const [pageHeaderTop, setPageHeaderTop] = useState<number>(0)

    const top = `${pageHeaderTop}px`

    return (
      <div
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        style={{ top }}
        ref={(node) => {
          if (!node) return
          // NOTE: DOMノードがセットされたときにtopの位置を計算してセットする
          setPageHeaderTop(node.getBoundingClientRect().top ?? 0)

          // NOTE: 親コンポーネントからのrefがある場合は、それも適用する
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        {...props}
      />
    )
  },
)

StickyWrapper.displayName = 'StickyWrapper'

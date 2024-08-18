import clsx from 'clsx'
import { forwardRef, ElementRef } from 'react'
import { BubbleMenu as RowBubbleMenu, BubbleMenuProps } from '@tiptap/react'
import styles from '../index.module.scss'

const BLOCK_NAME = 'menu-bubble'
type Props = {} & BubbleMenuProps

// NOTE: refが生えていないのでbubble-menuには渡せない
type Ref = ElementRef<'div'>

/**
 * @see https://tiptap.dev/api/extensions/bubble-menu
 * 内部的にtippy.jsを使っているっぽい
 * @see https://atomiks.github.io/tippyjs/
 */
export const MenuBubble = forwardRef<Ref, Props>(
  ({ className, editor, ...props }) => (
    <RowBubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100, maxWidth: 600 }}
      className={clsx(styles[`${BLOCK_NAME}`], className)}
  
      {...props}
    />
  ),
)

MenuBubble.displayName = 'MenuBubble'

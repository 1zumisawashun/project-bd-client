import { BubbleMenuProps, BubbleMenu as RowBubbleMenu } from '@tiptap/react'
import clsx from 'clsx'
import { FC } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'menu-bubble'
type Props = {} & BubbleMenuProps

// NOTE: refが生えていないのでbubble-menuには渡せない

/**
 * @see https://tiptap.dev/api/extensions/bubble-menu
 * 内部的にtippy.jsを使っているっぽい
 * @see https://atomiks.github.io/tippyjs/
 */
export const MenuBubble: FC<Props> = ({ className, editor, ...props }) => (
  <RowBubbleMenu
    editor={editor}
    tippyOptions={{ duration: 100, maxWidth: 600 }}
    className={clsx(styles[`${BLOCK_NAME}`], className)}
    {...props}
  />
)

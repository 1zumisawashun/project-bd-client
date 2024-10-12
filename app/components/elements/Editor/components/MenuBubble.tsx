import clsx from 'clsx'
import { BubbleMenu as RowBubbleMenu, BubbleMenuProps } from '@tiptap/react'
import styles from '../index.module.scss'

const BLOCK_NAME = 'menu-bubble'
type Props = {} & BubbleMenuProps

// NOTE: refが生えていないのでbubble-menuには渡せない

/**
 * @see https://tiptap.dev/api/extensions/bubble-menu
 * 内部的にtippy.jsを使っているっぽい
 * @see https://atomiks.github.io/tippyjs/
 */
export const MenuBubble: React.FC<Props> = ({
  className,
  editor,
  ...props
}) => (
  <RowBubbleMenu
    editor={editor}
    tippyOptions={{ duration: 100, maxWidth: 600 }}
    className={clsx(styles[`${BLOCK_NAME}`], className)}
    {...props}
  />
)

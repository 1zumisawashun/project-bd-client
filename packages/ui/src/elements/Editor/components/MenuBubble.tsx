import { BubbleMenu as RowBubbleMenu } from '@tiptap/react'
import clsx from 'clsx'
import { ComponentProps, FC } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'menu-bubble'

type BubbleMenuProps = ComponentProps<typeof RowBubbleMenu>

type CustomProps = {}

type Props = BubbleMenuProps & CustomProps

/**
 * NOTE:
 * @see https://tiptap.dev/api/extensions/bubble-menu
 * 内部的にtippy.jsを使っているっぽい
 * @see https://atomiks.github.io/tippyjs/
 */
export const MenuBubble: FC<Props> = ({
  // native props
  className,
  // tiptap props
  editor,
  // other props
  ...props
}) => (
  <RowBubbleMenu
    {...props}
    editor={editor}
    tippyOptions={{ duration: 100, maxWidth: 600 }}
    className={clsx(styles[`${BLOCK_NAME}`], className)}
  />
)

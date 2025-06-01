import {
  EditorContentProps,
  EditorContent as RowEditorContent,
} from '@tiptap/react'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'editor'
type Props = {} & EditorContentProps
type Ref = ElementRef<'div'>

export const EditorContent = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => (
    <RowEditorContent
      {...props}
      ref={ref}
      className={clsx(styles[`${BLOCK_NAME}-content`], className)}
    />
  ),
)

EditorContent.displayName = 'EditorContent'

import clsx from 'clsx'
import { forwardRef, ElementRef } from 'react'
import {
  EditorContent as RowEditorContent,
  EditorContentProps,
} from '@tiptap/react'
import styles from '../index.module.scss'

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

import { EditorContent as RowEditorContent } from '@tiptap/react'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'editor-content'

type EditorContentProps = ComponentProps<typeof RowEditorContent>

type CustomProps = {}

type Props = EditorContentProps & CustomProps

type Ref = ElementRef<'div'>

export const EditorContent = forwardRef<Ref, Props>(
  (
    {
      // native props
      className,
      // other props
      ...props
    },
    ref,
  ) => (
    <RowEditorContent
      {...props}
      ref={ref}
      className={clsx(styles[`${BLOCK_NAME}`], className)}
    />
  ),
)

EditorContent.displayName = 'EditorContent'

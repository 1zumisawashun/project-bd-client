'use client'

import { EditorContent } from '@/components/elements/Editor'
import { useEditor } from '@/components/elements/Editor/hooks/useEditor'
import { VStack } from '@/components/layouts/VStack'
import { FC } from 'react'
import styles from './articleEditor.module.css'
import { ArticleMenuBubble } from './components/articleMenuBubble/ArticleMenuBubble'
import { ArticleMenubar } from './components/articleMenubar/ArticleMenubar'

const BLOCK_NAME = 'articleEditor'

type ArticleEditorProps = {
  onChange: (content: string) => void
  value: string
}

export const ArticleEditor: FC<ArticleEditorProps> = ({ onChange, value }) => {
  const editor = useEditor({
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <VStack className={styles[`${BLOCK_NAME}`]}>
      <ArticleMenuBubble editor={editor} />
      <ArticleMenubar editor={editor} />
      <EditorContent
        editor={editor}
        className={styles[`${BLOCK_NAME}-content`]}
      />
    </VStack>
  )
}

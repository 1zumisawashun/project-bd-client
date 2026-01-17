'use client'

import { FC } from 'react'
import { EditorContent } from '@/components/elements/Editor'
import { useEditor } from '@/components/elements/Editor/hooks/useEditor'
import { VStack } from '@/components/layouts/VStack'
import styles from './articleEditor.module.css'
import { ArticleMenubar } from './components/articleMenubar/ArticleMenubar'
import { ArticleMenuBubble } from './components/articleMenuBubble/ArticleMenuBubble'

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

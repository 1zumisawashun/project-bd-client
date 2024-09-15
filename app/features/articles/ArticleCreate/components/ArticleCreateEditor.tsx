/* eslint-disable @typescript-eslint/no-shadow */

'use client'

import { EditorContent } from '@/components/elements/Editor'
import { useEditor } from '@/components/elements/Editor/hooks/useEditor'
import { VStack } from '@/components/elements/VStack'
import { ArticleCreateMenuBubble } from './ArticleCreateMenuBubble'
import { ArticleCreateMenubar } from './ArticleCreateMenubar'

export const ArticleCreateEditor: React.FC<{
  onChange: (content: string) => void
  value: string
}> = ({ onChange, value }) => {
  const editor = useEditor({
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <VStack>
      <ArticleCreateMenubar editor={editor} />
      <ArticleCreateMenuBubble editor={editor} />
      <EditorContent editor={editor} />
    </VStack>
  )
}

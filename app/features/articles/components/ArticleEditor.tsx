/* eslint-disable @typescript-eslint/no-shadow */

'use client'

import { EditorContent } from '@/components/elements/Editor'
import { useEditor } from '@/components/elements/Editor/hooks/useEditor'
import { VStack } from '@/components/elements/VStack'
import { ArticleMenuBubble } from './ArticleMenuBubble'
import { ArticleMenubar } from './ArticleMenubar'

type Props = {
  onChange: (content: string) => void
  value: string
}
export const ArticleEditor: React.FC<Props> = ({ onChange, value }) => {
  const editor = useEditor({
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <VStack>
      <ArticleMenubar editor={editor} />
      <ArticleMenuBubble editor={editor} />
      <EditorContent editor={editor} />
    </VStack>
  )
}

'use client'

import { EditorContent } from '@/components/elements/Editor'
import { useEditor } from '@/components/elements/Editor/hooks/useEditor'
import { Button } from '@/components/buttons/Button'
import { VStack } from '@/components/elements/VStack'
import { ArticleCreateMenuBubble } from './components/ArticleCreateMenuBubble'
import { ArticleCreateMenubar } from './components/ArticleCreateMenubar'

export const ArticleCreate: React.FC = () => {
  const { editor, onSubmit } = useEditor()

  if (!editor) return null

  return (
    <VStack>
      <ArticleCreateMenubar editor={editor} />
      <ArticleCreateMenuBubble editor={editor} />
      <EditorContent editor={editor} />
      <div>
        <Button onClick={onSubmit}>submit</Button>
      </div>
    </VStack>
  )
}

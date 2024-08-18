'use client'

import { EditorContent } from '@/components/elements/Editor'
import { useEditor } from '@/components/elements/Editor/hooks/useEditor'
import { Button } from '@/components/buttons/Button'
import { ArticleCreateMenuBubble } from './components/ArticleCreateMenuBubble'
import { ArticleCreateMenubar } from './components/ArticleCreateMenubar'

export const ArticleCreate: React.FC = () => {
  const { editor, onSubmit } = useEditor()

  if (!editor) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ArticleCreateMenubar editor={editor} />
      <ArticleCreateMenuBubble editor={editor} />
      <EditorContent editor={editor} />
      <div>
        <Button onClick={onSubmit}>submit</Button>
      </div>
    </div>
  )
}

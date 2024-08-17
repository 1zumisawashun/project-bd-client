'use client'

import { Menu, MenuBubble, EditorContent } from '@/components/elements/Editor'
import { useEditor } from '@/components/elements/Editor/hooks/useEditor'
import { Button } from '@/components/buttons/Button'

export const ArticleCreate: React.FC = () => {
  const { editor, onSubmit } = useEditor()

  if (!editor) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* <Menu editor={editor} /> */}
      <MenuBubble editor={editor} />
      <EditorContent editor={editor} />
      <div>
        <Button onClick={onSubmit}>submit</Button>
      </div>
    </div>
  )
}

import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent } from './components/EditorContent'
import { Menu } from './components/Menu'
import { MenuBubble } from './components/MenuBubble'
import { content } from './index.constant'
import {
  Image,
  TextAlign,
  Link,
  Focus,
  Placeholder,
  CharacterCount,
} from './helpers'
import { Button } from '../../buttons/Button'

export const Editor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign,
      Image,
      Link,
      Focus,
      Placeholder,
      CharacterCount,
    ],
    content,
  })

  // NOTE:https://tiptap.dev/guide/output
  const handleSubmit = () => {
    if (!editor) return
    const html = editor.getHTML()
    alert(html)
  }
  if (!editor) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Menu editor={editor} />
      <MenuBubble editor={editor} />
      <EditorContent editor={editor} />
      <Button onClick={handleSubmit}>submit</Button>
    </div>
  )
}

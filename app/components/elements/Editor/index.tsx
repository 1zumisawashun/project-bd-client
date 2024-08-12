import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { MenuSub } from './components/MenuSub'
import { EditorContent } from './components/EditorContent'
import { Menu } from './components/Menu'
import { MenuBubble } from './components/MenuBubble'
import { content } from './index.constant'
// import {
//   Image,
//   TextAlign,
//   Link,
//   Focus,
//   ExtensionComponent,
//   Paragraph,
//   Placeholder,
//   CharacterCount,
//   CustomNewline,
//   EventHandler,
//   Blockquote,
// } from './helpers'
import { Button } from '../../buttons/Button'

export const Editor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      // TextAlign,
      // Image,
      // Link,
      // Focus,
      // ExtensionComponent,
      // Paragraph,
      // Placeholder,
      // CharacterCount,
      // CustomNewline,
      // EventHandler,
      // Blockquote,
    ],
    content,
    // onTransaction: ({ state }) => {
    //   console.log(state.selection.anchor)
    // },
  })

  // NOTE:https://tiptap.dev/guide/output
  const handleSubmit = () => {
    if (!editor) return
    const html = editor.getHTML()
    alert(html)
  }

  return (
    <div className="">
      {editor && (
        <div>
          <Menu editor={editor} />
          <MenuSub editor={editor} />
          {/*<MenuBubble editor={editor} /> */}
          <EditorContent editor={editor} />
          <Button onClick={handleSubmit}>submit</Button>
        </div>
      )}
    </div>
  )
}

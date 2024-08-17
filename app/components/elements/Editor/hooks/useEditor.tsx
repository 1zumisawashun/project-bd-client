import { useEditor as useRowEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Image,
  TextAlign,
  Link,
  Focus,
  Placeholder,
  CharacterCount,
} from '../helpers/tiptapExtendClient'
import { content } from '../index.constant'

export const useEditor = () => {
  const editor = useRowEditor({
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
  const onSubmit = () => {
    if (!editor) return
    const html = editor.getHTML()
    alert(html)
  }

  return { editor, onSubmit }
}

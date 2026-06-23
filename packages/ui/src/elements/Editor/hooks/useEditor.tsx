import { UseEditorOptions, useEditor as useRowEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  CharacterCount,
  Focus,
  Image,
  Link,
  Placeholder,
  TextAlign,
} from '../helpers/tiptapExtendClient'

export const useEditor = ({ extensions = [], ...rest }: UseEditorOptions) =>
  useRowEditor({
    extensions: [
      StarterKit,
      TextAlign,
      Image,
      Link,
      Focus,
      Placeholder,
      CharacterCount,
      ...extensions,
    ],
    ...rest,
  })

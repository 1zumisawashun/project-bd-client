import { useEditor as useRowEditor, UseEditorOptions } from '@tiptap/react'
// eslint-disable-next-line import/no-named-as-default
import StarterKit from '@tiptap/starter-kit'
import {
  Image,
  TextAlign,
  Link,
  Focus,
  Placeholder,
  CharacterCount,
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

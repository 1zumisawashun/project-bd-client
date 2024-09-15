import { useEditor as useRowEditor, UseEditorOptions } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Image,
  TextAlign,
  Link,
  Focus,
  Placeholder,
  CharacterCount,
} from '../helpers/tiptapExtendClient'
import { content as defaultValue } from '../index.constant'

export const useEditor = ({
  extensions = [],
  content,
  ...rest
}: UseEditorOptions) =>
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
    content: content || defaultValue,
    ...rest,
  })

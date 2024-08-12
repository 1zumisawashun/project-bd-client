import { Editor } from '@tiptap/react'
import { useEditor } from '../hooks/useEditor'
import { Button } from '../../../buttons/Button'

export type MenuProps = {
  editor: Editor
}

export const Menu: React.FC<MenuProps> = ({ editor }) => {
  const {
    bold,
    italic,
    strike,
    trash,
    heading1,
    heading2,
    heading3,
    bulletList,
    orderedList,
    blockquote,
    horizontal,
    textAlignLeft,
    textAlignCenter,
    textAlignRight,
    link,
    linkBreak,
  } = useEditor(editor)

  const items = [
    bold,
    italic,
    strike,
    trash,
    heading1,
    heading2,
    heading3,
    bulletList,
    orderedList,
    blockquote,
    horizontal,
    textAlignLeft,
    textAlignCenter,
    textAlignRight,
    link,
    linkBreak,
  ]

  return (
    <div>
      {items.map((item) => (
        <Button
          key={item.type}
          onClick={item.onClick}
          disabled={item.disabled}
          className={item.className}
        >
          {item.children}
        </Button>
      ))}
    </div>
  )
}

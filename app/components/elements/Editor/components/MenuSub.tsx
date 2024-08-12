import { Editor } from '@tiptap/react'
import { useEditor } from '../hooks/useEditor'
import { Button } from '../../../buttons/Button'

export const MenuSub = ({ editor }: { editor: Editor }) => {
  const {
    code,
    clearMarks,
    clearNodes,
    paragraph,
    codeBlock,
    hardBreak,
    undo,
    redo,
    textAlignJustify,
  } = useEditor(editor)

  const items = [
    code,
    clearMarks,
    clearNodes,
    paragraph,
    codeBlock,
    hardBreak,
    undo,
    redo,
    textAlignJustify,
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

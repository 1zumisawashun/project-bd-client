import { Editor } from '@tiptap/react'
import { tiptapClient } from '../helpers/tiptapClient'
import { Button } from '../../../buttons/Button'

export const Menu: React.FC<{
  editor: Editor
}> = ({ editor }) => {
  const {
    // main
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
    //sub
    code,
    clearMarks,
    clearNodes,
    paragraph,
    codeBlock,
    hardBreak,
    undo,
    redo,
    textAlignJustify,
  } = tiptapClient(editor)

  const mains = [
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

  const subs = [
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
        {mains.map((d) => {
          const Icon = d.icon ?? null
          return (
            <Button
              key={d.type}
              onClick={d.onClick}
              disabled={d.disabled}
              className={d.className}
              variant="outlined"
            >
              {Icon ? <Icon /> : d.label}
            </Button>
          )
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
        {subs.map((d) => {
          const Icon = d.icon ?? null
          return (
            <Button
              key={d.type}
              onClick={d.onClick}
              disabled={d.disabled}
              className={d.className}
              variant="outlined"
            >
              {Icon ? <Icon /> : d.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

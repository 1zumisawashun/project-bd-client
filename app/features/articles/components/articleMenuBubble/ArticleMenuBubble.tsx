import { Button } from '@/components/buttons/Button'
import { MenuBubble } from '@/components/elements/Editor'
import { tiptapClient } from '@/components/elements/Editor/helpers/tiptapClient'
import { Editor } from '@tiptap/react'
import styles from './articleMenuBubble.module.css'

const BLOCK_NAME = 'articleMenuBubble'
type Props = {
  editor: Editor
}
export const ArticleMenuBubble: React.FC<Props> = ({ editor }) => {
  const { bold, italic, strike, trash, link } = tiptapClient(editor)

  const items = [bold, italic, strike, link, trash]
  const className = styles[`${BLOCK_NAME}`]!

  return (
    <MenuBubble editor={editor} className={className}>
      {items.map((d) => {
        const Icon = d.icon ?? null
        return (
          <Button
            key={`menu-bubble-${d.type}-${d.label}`}
            onClick={d.onClick}
            variant="ghost"
          >
            {Icon ? <Icon /> : d.label}
          </Button>
        )
      })}
    </MenuBubble>
  )
}

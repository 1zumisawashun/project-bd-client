import { tiptapClient } from '@/components/elements/Editor/helpers/tiptapClient'
import { MenuBubble } from '@/components/elements/Editor'
import { Button } from '@/components/buttons/Button'
import { Editor } from '@tiptap/react'
import styles from '../ArticleCreate.module.scss'

const BLOCK_NAME = 'article-create'

type Props = {
  editor: Editor
}
export const ArticleCreateMenuBubble: React.FC<Props> = ({ editor }) => {
  const { bold, italic, strike, trash, link } = tiptapClient(editor)

  const items = [bold, italic, strike, link, trash]

  return (
    <MenuBubble
      editor={editor}
      className={styles[`${BLOCK_NAME}-menu-bubble`] as any}
    >
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

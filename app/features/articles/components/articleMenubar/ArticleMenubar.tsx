import { Editor } from '@tiptap/react'
import {
  Menubar,
  MenubarMenu,
  MenubarItem,
  MenubarContent,
  MenubarTrigger,
} from '@/components/elements/Menubar'
import { TextIcon } from '@radix-ui/react-icons'
import { tiptapClient } from '@/components/elements/Editor/helpers/tiptapClient'
import styles from './articleMenubar.module.scss'

const BLOCK_NAME = 'articleMenubar'
type Props = {
  editor: Editor
}
export const ArticleMenubar: React.FC<Props> = ({ editor }) => {
  const {
    // typography
    bold,
    italic,
    strike,
    hardBreak,
    // heading
    heading1,
    heading2,
    heading3,
    paragraph,
    // list
    bulletList,
    orderedList,
    // text align
    textAlignLeft,
    textAlignCenter,
    textAlignRight,
    textAlignJustify,
    // link
    link,
    linkBreak,
    // code
    code,
    codeBlock,
    // other
    trash,
    blockquote,
    horizontal,
  } = tiptapClient(editor)

  const items = [
    // typography
    bold,
    italic,
    strike,
    hardBreak,
    // heading
    heading1,
    heading2,
    heading3,
    paragraph,
    // list
    bulletList,
    orderedList,
    // text align
    textAlignLeft,
    textAlignCenter,
    textAlignRight,
    textAlignJustify,
    // link
    link,
    linkBreak,
    // code
    code,
    codeBlock,
    // other
    trash,
    blockquote,
    horizontal,
  ]

  const groupedItems = Object.groupBy(items, (item) => item.type)

  return (
    <Menubar className={styles[`${BLOCK_NAME}`]}>
      {Object.entries(groupedItems).map(([key, value]) => {
        const Icon =
          key === 'typography' ? TextIcon : (value?.[0]?.icon ?? TextIcon)
        return (
          <MenubarMenu key={`menubar-menu-${key}`}>
            <MenubarTrigger>
              <Icon />
            </MenubarTrigger>
            <MenubarContent align="start" sideOffset={5} alignOffset={-3}>
              {value?.map((d) => (
                <MenubarItem
                  key={`menubar-item-${d.label}`}
                  onClick={d.onClick}
                  disabled={d.disabled}
                >
                  {d.label}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        )
      })}
    </Menubar>
  )
}

import { TextIcon } from '@radix-ui/react-icons'
import { Editor } from '@tiptap/react'
import { FC } from 'react'
import { tiptapClient } from '@/components/elements/Editor/helpers/tiptapClient'
import {
  Menu,
  MenuItem,
  MenuList,
  MenuTrigger,
} from '@/components/elements/Menu'
import { Menubar } from '@/components/elements/Menubar'
import styles from './articleMenubar.module.css'

const BLOCK_NAME = 'articleMenubar'

type ArticleMenubarProps = {
  editor: Editor
}

export const ArticleMenubar: FC<ArticleMenubarProps> = ({ editor }) => {
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
    <Menubar className={styles[`${BLOCK_NAME}`]!}>
      {Object.entries(groupedItems).map(([key, value]) => {
        const Icon =
          key === 'typography' ? TextIcon : (value?.[0]?.icon ?? TextIcon)
        return (
          <Menu key={`menubar-menu-${key}`}>
            <MenuTrigger render={<Icon />} />
            <MenuList>
              {value?.map((d) => (
                <MenuItem
                  key={`menubar-item-${d.label}`}
                  onClick={d.onClick}
                  disabled={d.disabled}
                >
                  {d.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )
      })}
    </Menubar>
  )
}

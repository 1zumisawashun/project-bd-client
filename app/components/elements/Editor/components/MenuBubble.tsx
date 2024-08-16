import { BubbleMenu as RowBubbleMenu, Editor } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { useEditor } from '../hooks/useEditor'
import { Tooltip } from '../../Tooltip'
import { Button } from '../../../buttons/Button'

// NOTE:https://tiptap.dev/api/extensions/bubble-menu
// NOTE:内部的にtippy.jsを使っているっぽい
// NOTE:https://atomiks.github.io/tippyjs/
export const MenuBubble: React.FC<{ editor: Editor }> = ({ editor }) => {
  const {
    bold,
    italic,
    strike,
    trash,
    heading2,
    heading3,
    paragraph,
    bulletList,
    orderedList,
    blockquote,
    textAlignLeft,
    textAlignCenter,
    textAlignRight,
    link,
  } = useEditor(editor)

  const headingDisclosure = useDisclosure()
  const textAlignDisclosure = useDisclosure()
  const listDisclosure = useDisclosure()

  const headings = {
    type: 'headings',
    onClick: () => null,
    onMouseOver: () => headingDisclosure.open(),
    onMouseLeave: () => headingDisclosure.close(),
    disabled: false,
    className: '',
    children: '見出し',
    icon: null,
    label: '見出し',
  }

  const lists = {
    type: 'lists',
    onClick: () => null,
    onMouseOver: () => listDisclosure.open(),
    onMouseLeave: () => listDisclosure.close(),
    disabled: false,
    className: '',
    children: <p style={{ fontSize: '13px' }}>リスト</p>,
    icon: null,
    label: 'リスト',
  }

  const textAligns = {
    type: 'textAligns',
    onClick: () => null,
    onMouseOver: () => textAlignDisclosure.open(),
    onMouseLeave: () => textAlignDisclosure.close(),
    disabled: false,
    className: '',
    children: '文章の配置',
    icon: null,
    label: '文章の配置',
  }

  const items = [
    headings,
    bold,
    italic,
    strike,
    lists,
    textAligns,
    link,
    blockquote,
    trash,
  ]

  const headingItems = [heading2, heading3, paragraph]
  const listItems = [bulletList, orderedList, paragraph]
  const textAlignItems = [textAlignLeft, textAlignCenter, textAlignRight]

  return (
    <RowBubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        maxWidth: 600,
      }}
    >
      <div style={{ border: '1px solid black' }}>
        {items.map((item) => (
          <Button key={item.type} onClick={item.onClick} variant="ghost">
            {item.children}
          </Button>
        ))}
      </div>
    </RowBubbleMenu>
  )
}

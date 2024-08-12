import { BubbleMenu as BubbleMenuTiptap, Editor } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { useEditor } from '../hooks/useEditor'

export type MenuBubbleProps = {
  editor: Editor
}

// NOTE:https://tiptap.dev/api/extensions/bubble-menu
// NOTE:内部的にtippy.jsを使っているっぽい
// NOTE:https://atomiks.github.io/tippyjs/
export const MenuBubble: React.FC<MenuBubbleProps> = ({ editor }) => {
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

  const [isEditable, setIsEditable] = useState(true)

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)
    }
  }, [isEditable, editor])

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
    <BubbleMenuTiptap
      editor={editor}
      tippyOptions={{
        duration: 100,
        maxWidth: 600,
      }}
    >
      <div>
        {/* {items.map((item, index) => (
          <Tooltip title={item.type} key={index} placement="top" arrow>
            <div
              onMouseOver={item?.onMouseOver}
              onMouseLeave={item?.onMouseLeave}
              style={{ display: 'relative' }}
            >
              <Item onClick={item.onClick} className={item.className}>
                {item.icon}
                {!['link', 'blockquote'].includes(item.type)
                  ? item.label
                  : null}
              </Item>
              {headingDisclosure.isOpen && item.type === 'headings' && (
                <Popper>
                  <PopperInner>
                    {headingItems.map((item) => (
                      <Item onClick={item.onClick} className={item.className}>
                        {item.icon}
                        {item.label}
                      </Item>
                    ))}
                  </PopperInner>
                </Popper>
              )}
              {textAlignDisclosure.isOpen && item.type === 'textAligns' && (
                <Popper>
                  <PopperInner>
                    {textAlignItems.map((item) => (
                      <Item onClick={item.onClick} className={item.className}>
                        {item.icon}
                        {item.label}
                      </Item>
                    ))}
                  </PopperInner>
                </Popper>
              )}
              {listDisclosure.isOpen && item.type === 'lists' && (
                <Popper>
                  <PopperInner>
                    {listItems.map((item) => (
                      <Item onClick={item.onClick} className={item.className}>
                        {item.icon}
                        {item.label}
                      </Item>
                    ))}
                  </PopperInner>
                </Popper>
              )}
            </div>
          </Tooltip>
        ))} */}
      </div>
    </BubbleMenuTiptap>
  )
}

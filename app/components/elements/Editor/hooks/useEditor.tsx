import { Editor } from '@tiptap/react'

import {
  Link1Icon,
  LinkBreak1Icon,
  DividerHorizontalIcon,
  QuoteIcon,
  TrashIcon,
  CodeIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  ListBulletIcon,
} from '@radix-ui/react-icons'

export const useEditor = (editor: Editor) => {
  const setLink = () => {
    const previousUrl = editor.getAttributes('link')['href']
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) return
    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const bold = {
    type: 'bold',
    onClick: () => editor.chain().focus().toggleBold().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: !editor.can().chain().focus().toggleBold().run(),
    className: editor.isActive('bold') ? 'is-active' : '',
    children: <FontBoldIcon />,
    icon: <FontBoldIcon />,
    label: '太字',
  }

  const italic = {
    type: 'italic',
    onClick: () => editor.chain().focus().toggleItalic().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: !editor.can().chain().focus().toggleItalic().run(),
    className: editor.isActive('italic') ? 'is-active' : '',
    children: <FontItalicIcon />,
    icon: <FontItalicIcon />,
    label: 'イタリック体',
  }

  const strike = {
    type: 'strike',
    onClick: () => editor.chain().focus().toggleStrike().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: !editor.can().chain().focus().toggleStrike().run(),
    className: editor.isActive('strike') ? 'is-active' : '',
    children: <StrikethroughIcon />,
    icon: <StrikethroughIcon />,
    label: '取消線',
  }

  const trash = {
    type: 'trash',
    onClick: () => editor.chain().focus().deleteSelection().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: '',
    children: <TrashIcon />,
    icon: <TrashIcon />,
    label: '削除',
  }

  const heading1 = {
    type: 'heading',
    onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: editor.isActive('heading', { level: 1 }) ? 'is-active' : '',
    children: 'h1',
    icon: null,
    label: '',
  }

  const heading2 = {
    type: 'heading',
    onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: editor.isActive('heading', { level: 2 }) ? 'is-active' : '',
    children: 'h2',
    icon: null,
    label: '大見出し',
  }

  const heading3 = {
    type: 'heading',
    onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: editor.isActive('heading', { level: 3 }) ? 'is-active' : '',
    children: 'h3',
    icon: null,
    label: '小見出し',
  }

  const bulletList = {
    type: 'bulletList',
    onClick: () => editor.chain().focus().toggleBulletList().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: editor.isActive('bulletList') ? 'is-active' : '',
    children: <ListBulletIcon />,
    icon: <ListBulletIcon />,
    label: '箇条書きリスト',
  }

  const orderedList = {
    type: 'orderedList',
    onClick: () => editor.chain().focus().toggleOrderedList().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: editor.isActive('orderedList') ? 'is-active' : '',
    children: 'orderedList',
    icon: null,
    label: '番号付きリスト',
  }

  const blockquote = {
    type: 'blockquote',
    onClick: () => editor.chain().focus().toggleBlockquote().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: editor.isActive('blockquote') ? 'is-active' : '',
    children: <QuoteIcon />,
    icon: <QuoteIcon />,
    label: '引用',
  }

  const horizontal = {
    type: 'horizontal',
    onClick: () => editor.chain().focus().setHorizontalRule().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: '',
    children: <DividerHorizontalIcon />,
    icon: <DividerHorizontalIcon />,
    label: '区切り線',
  }

  const textAlignLeft = {
    type: 'textAlign',
    onClick: () => editor.chain().focus().setTextAlign('left').run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: editor.isActive({ textAlign: 'left' }) ? 'is-active' : '',
    children: <TextAlignLeftIcon />,
    icon: <TextAlignLeftIcon />,
    label: '指定なし',
  }

  const textAlignCenter = {
    type: 'textAlign',
    onClick: () => editor.chain().focus().setTextAlign('center').run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: editor.isActive({ textAlign: 'center' }) ? 'is-active' : '',
    children: <TextAlignCenterIcon />,
    icon: <TextAlignCenterIcon />,
    label: '中央寄せ',
  }

  const textAlignRight = {
    type: 'textAlign',
    onClick: () => editor.chain().focus().setTextAlign('right').run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: editor.isActive({ textAlign: 'right' }) ? 'is-active' : '',
    children: <TextAlignRightIcon />,
    icon: <TextAlignRightIcon />,
    label: '右寄せ',
  }

  const link = {
    type: 'link',
    onClick: () => setLink(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: editor.isActive('link') ? 'is-active' : '',
    children: <Link1Icon />,
    icon: <Link1Icon />,
    label: '埋め込み',
  }

  const linkBreak = {
    type: 'link',
    onClick: () => editor.chain().focus().unsetLink().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: !editor.isActive('link'),
    className: '',
    children: <LinkBreak1Icon />,
    icon: <LinkBreak1Icon />,
    label: '埋め込み',
  }

  const code = {
    type: 'code',
    onClick: () => editor.chain().focus().toggleCode().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: !editor.can().chain().focus().toggleCode().run(),
    className: editor.isActive('code') ? 'is-active' : '',
    children: <CodeIcon />,
    icon: <CodeIcon />,
    label: '',
  }

  const clearMarks = {
    type: 'clear',
    onClick: () => editor.chain().focus().unsetAllMarks().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: '',
    children: 'clear marks',
    icon: null,
    label: '',
  }

  const clearNodes = {
    type: 'clear',
    onClick: () => editor.chain().focus().clearNodes().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: '',
    children: 'clear nodes',
    icon: null,
    label: '',
  }

  const paragraph = {
    type: 'paragraph',
    onClick: () => editor.chain().focus().setParagraph().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: editor.isActive('paragraph') ? 'is-active' : '',
    children: 'p',
    icon: null,
    label: '指定なし',
  }

  const codeBlock = {
    type: 'codeBlock',
    onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: editor.isActive('codeBlock') ? 'is-active' : '',
    children: 'code block',
    icon: null,
    label: '',
  }

  const hardBreak = {
    type: 'hardBreak',
    onClick: () => editor.chain().focus().setHardBreak().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: '',
    children: 'br',
    icon: null,
    label: '',
  }

  const undo = {
    type: 'undo',
    onClick: () => editor.chain().focus().undo().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: !editor.can().chain().focus().undo().run(),
    className: '',
    children: 'undo',
    icon: null,
    label: '',
  }

  const redo = {
    type: 'redo',
    onClick: () => editor.chain().focus().redo().run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: !editor.can().chain().focus().redo().run(),
    className: '',
    children: 'redo',
    icon: null,
    label: '',
  }

  const textAlignJustify = {
    type: 'textAlign',
    onClick: () => editor.chain().focus().setTextAlign('justify').run(),
    onMouseOver: () => null,
    onMouseLeave: () => null,
    disabled: false,
    className: editor.isActive({ textAlign: 'justify' }) ? 'is-active' : '',
    children: <TextAlignJustifyIcon />,
    icon: <TextAlignJustifyIcon />,
    label: '',
  }

  return {
    //main
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
  }
}

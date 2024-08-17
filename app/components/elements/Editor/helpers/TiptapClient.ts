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

export const tiptapClient = (editor: Editor) => {
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
    disabled: !editor.can().chain().focus().toggleBold().run(),
    className: editor.isActive('bold') ? 'is-active' : '',
    icon: FontBoldIcon,
    label: '太字',
  }

  const italic = {
    type: 'italic',
    onClick: () => editor.chain().focus().toggleItalic().run(),
    disabled: !editor.can().chain().focus().toggleItalic().run(),
    className: editor.isActive('italic') ? 'is-active' : '',
    icon: FontItalicIcon,
    label: 'イタリック体',
  }

  const strike = {
    type: 'strike',
    onClick: () => editor.chain().focus().toggleStrike().run(),
    disabled: !editor.can().chain().focus().toggleStrike().run(),
    className: editor.isActive('strike') ? 'is-active' : '',
    icon: StrikethroughIcon,
    label: '取り消し線',
  }

  const trash = {
    type: 'trash',
    onClick: () => editor.chain().focus().deleteSelection().run(),
    disabled: false,
    className: '',
    icon: TrashIcon,
    label: '削除',
  }

  const heading1 = {
    type: 'heading',
    onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    disabled: false,
    className: editor.isActive('heading', { level: 1 }) ? 'is-active' : '',
    icon: null,
    label: '大見出し',
  }

  const heading2 = {
    type: 'heading',
    onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    disabled: false,
    className: editor.isActive('heading', { level: 2 }) ? 'is-active' : '',
    icon: null,
    label: '中見出し',
  }

  const heading3 = {
    type: 'heading',
    onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    disabled: false,
    className: editor.isActive('heading', { level: 3 }) ? 'is-active' : '',
    icon: null,
    label: '小見出し',
  }

  const bulletList = {
    type: 'bulletList',
    onClick: () => editor.chain().focus().toggleBulletList().run(),
    disabled: false,
    className: editor.isActive('bulletList') ? 'is-active' : '',
    icon: ListBulletIcon,
    label: '箇条書きリスト',
  }

  const orderedList = {
    type: 'orderedList',
    onClick: () => editor.chain().focus().toggleOrderedList().run(),
    disabled: false,
    className: editor.isActive('orderedList') ? 'is-active' : '',
    icon: null,
    label: '番号付きリスト',
  }

  const blockquote = {
    type: 'blockquote',
    onClick: () => editor.chain().focus().toggleBlockquote().run(),
    disabled: false,
    className: editor.isActive('blockquote') ? 'is-active' : '',
    icon: QuoteIcon,
    label: '引用',
  }

  const horizontal = {
    type: 'horizontal',
    onClick: () => editor.chain().focus().setHorizontalRule().run(),
    disabled: false,
    className: '',
    icon: DividerHorizontalIcon,
    label: '区切り線',
  }

  const textAlignLeft = {
    type: 'textAlign',
    onClick: () => editor.chain().focus().setTextAlign('left').run(),
    disabled: false,
    className: editor.isActive({ textAlign: 'left' }) ? 'is-active' : '',
    icon: TextAlignLeftIcon,
    label: '左寄せ',
  }

  const textAlignCenter = {
    type: 'textAlign',
    onClick: () => editor.chain().focus().setTextAlign('center').run(),
    disabled: false,
    className: editor.isActive({ textAlign: 'center' }) ? 'is-active' : '',
    icon: TextAlignCenterIcon,
    label: '中央寄せ',
  }

  const textAlignRight = {
    type: 'textAlign',
    onClick: () => editor.chain().focus().setTextAlign('right').run(),
    disabled: false,
    className: editor.isActive({ textAlign: 'right' }) ? 'is-active' : '',
    icon: TextAlignRightIcon,
    label: '右寄せ',
  }

  const textAlignJustify = {
    type: 'textAlign',
    onClick: () => editor.chain().focus().setTextAlign('justify').run(),
    disabled: false,
    className: editor.isActive({ textAlign: 'justify' }) ? 'is-active' : '',
    icon: TextAlignJustifyIcon,
    label: '中央寄せ',
  }

  const link = {
    type: 'link',
    onClick: () => setLink(),
    disabled: false,
    className: editor.isActive('link') ? 'is-active' : '',
    icon: Link1Icon,
    label: '埋め込み',
  }

  const linkBreak = {
    type: 'link',
    onClick: () => editor.chain().focus().unsetLink().run(),
    disabled: !editor.isActive('link'),
    className: '',
    icon: LinkBreak1Icon,
    label: '埋め込み',
  }

  const code = {
    type: 'code',
    onClick: () => editor.chain().focus().toggleCode().run(),
    disabled: !editor.can().chain().focus().toggleCode().run(),
    className: editor.isActive('code') ? 'is-active' : '',
    icon: CodeIcon,
    label: 'コード',
  }

  const clearMarks = {
    type: 'clear',
    onClick: () => editor.chain().focus().unsetAllMarks().run(),
    disabled: false,
    className: '',
    icon: null,
    label: 'clear marks',
  }

  const clearNodes = {
    type: 'clear',
    onClick: () => editor.chain().focus().clearNodes().run(),
    disabled: false,
    className: '',
    icon: null,
    label: 'clear nodes',
  }

  const paragraph = {
    type: 'paragraph',
    onClick: () => editor.chain().focus().setParagraph().run(),
    disabled: false,
    className: editor.isActive('paragraph') ? 'is-active' : '',
    icon: null,
    label: '指定なし',
  }

  const codeBlock = {
    type: 'codeBlock',
    onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    disabled: false,
    className: editor.isActive('codeBlock') ? 'is-active' : '',
    icon: null,
    label: 'code block',
  }

  const hardBreak = {
    type: 'hardBreak',
    onClick: () => editor.chain().focus().setHardBreak().run(),
    disabled: false,
    className: '',
    icon: null,
    label: 'br',
  }

  const undo = {
    type: 'undo',
    onClick: () => editor.chain().focus().undo().run(),
    disabled: !editor.can().chain().focus().undo().run(),
    className: '',
    icon: null,
    label: 'undo',
  }

  const redo = {
    type: 'redo',
    onClick: () => editor.chain().focus().redo().run(),
    disabled: !editor.can().chain().focus().redo().run(),
    className: '',
    icon: null,
    label: 'redo',
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

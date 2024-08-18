/* eslint-disable @typescript-eslint/no-use-before-define */
import type { Editor } from '@tiptap/core'

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
  TextIcon,
  HeadingIcon,
} from '@radix-ui/react-icons'

export const tiptapClient = (editor: Editor | null) => {
  /**
   * ==================================================
   * タイポグラフィ
   * ==================================================
   */

  const bold = {
    type: 'typography',
    onClick: () => editor?.chain().focus().toggleBold().run(),
    disabled: !editor?.can().chain().focus().toggleBold().run(),
    className: editor?.isActive('bold') ? 'is-active' : '',
    icon: FontBoldIcon,
    label: '太字',
  }
  const italic = {
    type: 'typography',
    onClick: () => editor?.chain().focus().toggleItalic().run(),
    disabled: !editor?.can().chain().focus().toggleItalic().run(),
    className: editor?.isActive('italic') ? 'is-active' : '',
    icon: FontItalicIcon,
    label: 'イタリック体',
  }
  const strike = {
    type: 'typography',
    onClick: () => editor?.chain().focus().toggleStrike().run(),
    disabled: !editor?.can().chain().focus().toggleStrike().run(),
    className: editor?.isActive('strike') ? 'is-active' : '',
    icon: StrikethroughIcon,
    label: '取り消し線',
  }
  const hardBreak = {
    type: 'typography',
    onClick: () => editor?.chain().focus().setHardBreak().run(),
    disabled: !editor?.can().chain().focus().setHardBreak().run(),
    className: editor?.isActive('hardBreak') ? 'is-active' : '',
    icon: null,
    label: '改行',
  }

  /**
   * ==================================================
   * 見出し
   * ==================================================
   */

  const heading1 = {
    type: 'heading',
    onClick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    disabled: !editor?.can().chain().focus().toggleHeading({ level: 1 }).run(),
    className: editor?.isActive('heading', { level: 1 }) ? 'is-active' : '',
    icon: HeadingIcon,
    label: '大見出し',
  }
  const heading2 = {
    type: 'heading',
    onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    disabled: !editor?.can().chain().focus().toggleHeading({ level: 2 }).run(),
    className: editor?.isActive('heading', { level: 2 }) ? 'is-active' : '',
    icon: HeadingIcon,
    label: '中見出し',
  }
  const heading3 = {
    type: 'heading',
    onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    disabled: !editor?.can().chain().focus().toggleHeading({ level: 3 }).run(),
    className: editor?.isActive('heading', { level: 3 }) ? 'is-active' : '',
    icon: HeadingIcon,
    label: '小見出し',
  }
  const paragraph = {
    type: 'heading',
    onClick: () => editor?.chain().focus().setParagraph().run(),
    disabled: !editor?.can().chain().focus().setParagraph().run(),
    className: editor?.isActive('paragraph') ? 'is-active' : '',
    icon: TextIcon,
    label: '指定なし',
  }

  /**
   * ==================================================
   * リスト
   * ==================================================
   */

  const bulletList = {
    type: 'list',
    onClick: () => editor?.chain().focus().toggleBulletList().run(),
    disabled: !editor?.can().chain().focus().toggleBulletList().run(),
    className: editor?.isActive('bulletList') ? 'is-active' : '',
    icon: ListBulletIcon,
    label: '箇条書きリスト',
  }
  const orderedList = {
    type: 'list',
    onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    disabled: !editor?.can().chain().focus().toggleOrderedList().run(),
    className: editor?.isActive('orderedList') ? 'is-active' : '',
    icon: null,
    label: '番号付きリスト',
  }

  /**
   * ==================================================
   * 配置
   * ==================================================
   */

  const textAlignLeft = {
    type: 'textAlign',
    onClick: () => editor?.chain().focus().setTextAlign('left').run(),
    disabled: !editor?.can().chain().focus().setTextAlign('left').run(),
    className: editor?.isActive({ textAlign: 'left' }) ? 'is-active' : '',
    icon: TextAlignLeftIcon,
    label: '左寄せ',
  }
  const textAlignCenter = {
    type: 'textAlign',
    onClick: () => editor?.chain().focus().setTextAlign('center').run(),
    disabled: !editor?.can().chain().focus().setTextAlign('center').run(),
    className: editor?.isActive({ textAlign: 'center' }) ? 'is-active' : '',
    icon: TextAlignCenterIcon,
    label: '中央寄せ',
  }
  const textAlignRight = {
    type: 'textAlign',
    onClick: () => editor?.chain().focus().setTextAlign('right').run(),
    disabled: !editor?.can().chain().focus().setTextAlign('right').run(),
    className: editor?.isActive({ textAlign: 'right' }) ? 'is-active' : '',
    icon: TextAlignRightIcon,
    label: '右寄せ',
  }
  const textAlignJustify = {
    type: 'textAlign',
    onClick: () => editor?.chain().focus().setTextAlign('justify').run(),
    disabled: !editor?.can().chain().focus().setTextAlign('justify').run(),
    className: editor?.isActive({ textAlign: 'justify' }) ? 'is-active' : '',
    icon: TextAlignJustifyIcon,
    label: '均等寄せ',
  }

  /**
   * ==================================================
   * コード
   * ==================================================
   */

  const code = {
    type: 'code',
    onClick: () => editor?.chain().focus().toggleCode().run(),
    disabled: !editor?.can().chain().focus().toggleCode().run(),
    className: editor?.isActive('code') ? 'is-active' : '',
    icon: CodeIcon,
    label: 'コード',
  }
  const codeBlock = {
    type: 'code',
    onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
    disabled: !editor?.can().chain().focus().toggleCodeBlock().run(),
    className: editor?.isActive('codeBlock') ? 'is-active' : '',
    icon: CodeIcon,
    label: 'コードブロック',
  }

  /**
   * ==================================================
   * コード
   * ==================================================
   */

  const link = {
    type: 'link',
    onClick: () => setLink(editor),
    disabled: false,
    className: editor?.isActive('link') ? 'is-active' : '',
    icon: Link1Icon,
    label: '埋め込み',
  }
  const linkBreak = {
    type: 'link',
    onClick: () => editor?.chain().focus().unsetLink().run(),
    disabled: !editor?.isActive('link'),
    className: '',
    icon: LinkBreak1Icon,
    label: '埋め込み 解除',
  }

  /**
   * ==================================================
   * その他
   * ==================================================
   */

  const blockquote = {
    type: 'blockquote',
    onClick: () => editor?.chain().focus().toggleBlockquote().run(),
    disabled: !editor?.can().chain().focus().toggleBlockquote().run(),
    className: editor?.isActive('blockquote') ? 'is-active' : '',
    icon: QuoteIcon,
    label: '引用',
  }
  const horizontal = {
    type: 'horizontal',
    onClick: () => editor?.chain().focus().setHorizontalRule().run(),
    disabled: !editor?.can().chain().focus().setHorizontalRule().run(),
    className: editor?.isActive('horizontal') ? 'is-active' : '',
    icon: DividerHorizontalIcon,
    label: '区切り線',
  }
  const trash = {
    type: 'trash',
    onClick: () => editor?.chain().focus().deleteSelection().run(),
    disabled: !editor?.can().chain().focus().deleteSelection().run(),
    className: editor?.isActive('trash') ? 'is-active' : '',
    icon: TrashIcon,
    label: '削除',
  }

  /**
   * ==================================================
   * 未使用
   * ==================================================
   */

  const clearMarks = {
    type: 'clear',
    onClick: () => editor?.chain().focus().unsetAllMarks().run(),
    disabled: !editor?.can().chain().focus().unsetAllMarks().run(),
    className: editor?.isActive('clear') ? 'is-active' : '',
    icon: null,
    label: 'clear marks',
  }
  const clearNodes = {
    type: 'clear',
    onClick: () => editor?.chain().focus().clearNodes().run(),
    disabled: !editor?.can().chain().focus().clearNodes().run(),
    className: '',
    icon: null,
    label: 'clear nodes',
  }
  const undo = {
    type: 'undo',
    onClick: () => editor?.chain().focus().undo().run(),
    disabled: !editor?.can().chain().focus().undo().run(),
    className: '',
    icon: null,
    label: 'undo',
  }
  const redo = {
    type: 'redo',
    onClick: () => editor?.chain().focus().redo().run(),
    disabled: !editor?.can().chain().focus().redo().run(),
    className: '',
    icon: null,
    label: 'redo',
  }

  return {
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

const setLink = (editor: Editor | null) => {
  const previousUrl = editor?.getAttributes('link')['href']
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) return
  // empty
  if (url === '') {
    editor?.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  // update link
  editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

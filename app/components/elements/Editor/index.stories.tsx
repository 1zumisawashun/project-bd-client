import type { Meta, StoryObj } from '@storybook/react'

import { Menu, MenuBubble, EditorContent } from './index'
import { useEditor } from './hooks/useEditor'
import { Button } from '../../buttons/Button'

const meta: Meta<typeof EditorContent> = {
  title: 'element/Editor',
  component: EditorContent,
}
export default meta
type Story = StoryObj<typeof EditorContent>

function Render() {
  const { editor, onSubmit } = useEditor()

  if (!editor) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Menu editor={editor} />
      <MenuBubble editor={editor} />
      <EditorContent editor={editor} />
      <Button onClick={onSubmit}>submit</Button>
    </div>
  )
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}

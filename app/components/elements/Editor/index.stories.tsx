import type { Meta, StoryObj } from '@storybook/react'

import { EditorContent } from './index'
import { useEditor } from './hooks/useEditor'

const meta: Meta<typeof EditorContent> = {
  title: 'element/Editor',
  component: EditorContent,
  decorators: (Story) => (
    <div style={{ width: '576px' }}>
      <Story />
    </div>
  ),
}
export default meta
type Story = StoryObj<typeof EditorContent>

function Render() {
  const { editor } = useEditor()

  if (!editor) return null

  return <EditorContent editor={editor} />
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}

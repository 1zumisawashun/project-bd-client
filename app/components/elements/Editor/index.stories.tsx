import type { Meta, StoryObj } from '@storybook/react'

import { content } from '@/functions/constants/content'
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

const Render: React.FC = () => {
  const editor = useEditor({
    content,
  })
  console.log(editor)

  if (!editor) return null

  return <EditorContent editor={editor} />
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}

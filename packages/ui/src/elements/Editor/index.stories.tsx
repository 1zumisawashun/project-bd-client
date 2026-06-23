import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { useEditor } from './hooks/useEditor'
import { EditorContent } from './index'

const CONTENT = `
<h2>Hi there,</h2>
<p>this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:</p>
<ul><li>That's a bullet list with one …</li><li>… or two list items.</li></ul>
<p>Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:</p>
<pre><code class="language-css">body { display: none; }</code></pre>
<blockquote>Wow, that's amazing. Good work, boy! 👏<br />— Mom</blockquote>
`

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

const Render: FC = () => {
  const editor = useEditor({
    content: CONTENT,
  })

  if (!editor) return null

  return <EditorContent editor={editor} />
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}

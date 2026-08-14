import { type Meta, type StoryObj } from "@storybook/react";
import { FC } from "react";
const CONTENT = "<h2>Sample heading</h2><p>Sample paragraph content for the editor story.</p>";
import { useEditor } from "./hooks/useEditor";
import { EditorContent } from "./index";

const meta: Meta<typeof EditorContent> = {
  title: "element/Editor",
  component: EditorContent,
  decorators: (Story) => (
    <div style={{ width: "576px" }}>
      <Story />
    </div>
  ),
};
export default meta;
type Story = StoryObj<typeof EditorContent>;

const Render: FC = () => {
  const editor = useEditor({
    content: CONTENT,
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
};

export const Default: Story = {
  args: {},
  render: () => <Render />,
};

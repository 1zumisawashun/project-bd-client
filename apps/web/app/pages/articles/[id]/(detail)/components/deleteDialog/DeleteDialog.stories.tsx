import { type Meta, type StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { FC } from "react";
import { Button,useDisclosure } from "@project-bd-client/ui";
import { DeleteDialog } from "./DeleteDialog";

const meta: Meta<typeof DeleteDialog> = {
  title: "feature/articles/DeleteDialog",
  component: DeleteDialog,
};

export default meta;

type Story = StoryObj<typeof DeleteDialog>;

const Render: FC = () => {
  const { isOpen, close, open } = useDisclosure();
  return (
    <>
      <Button onClick={open}>Open Dialog</Button>
      <DeleteDialog isOpen={isOpen} onClose={close} articleId="" />
    </>
  );
};

export const Default: Story = {
  args: {},
  render: () => <Render />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
  },
};

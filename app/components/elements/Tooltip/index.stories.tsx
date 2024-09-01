import type { Meta, StoryObj } from '@storybook/react'

import { PlusIcon } from '@radix-ui/react-icons'
import { Tooltip } from './index'
import { IconButton } from '../../buttons/IconButton'

const meta: Meta<typeof Tooltip> = {
  title: 'element/Tooltip',
  component: Tooltip,
}
export default meta
type Story = StoryObj<typeof Tooltip>

const Render: React.FC = () => {
  return (
    <Tooltip content="sample">
      <IconButton>
        <PlusIcon />
      </IconButton>
    </Tooltip>
  )
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}

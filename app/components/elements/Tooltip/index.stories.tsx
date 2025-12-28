import type { Meta, StoryObj } from '@storybook/react'

import { PlusIcon } from '@radix-ui/react-icons'
import { FC } from 'react'
import { IconButton } from '../../buttons/IconButton'
import { Tooltip } from './index'

const meta: Meta<typeof Tooltip> = {
  title: 'element/Tooltip',
  component: Tooltip,
}
export default meta
type Story = StoryObj<typeof Tooltip>

const Render: FC = () => {
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

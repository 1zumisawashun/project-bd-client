import type { Meta, StoryObj } from '@storybook/react'

import { FC } from 'react'
import { Button } from '../../buttons/Button'
import { Tooltip, TooltipContent, TooltipTrigger } from './index'

const meta: Meta<typeof Tooltip> = {
  title: 'element/Tooltip',
  component: Tooltip,
}

export default meta

type Story = StoryObj<typeof Tooltip>

const Render: FC = () => {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button>Open Menu</Button>} />
      <TooltipContent>Tooltip Content</TooltipContent>
    </Tooltip>
  )
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}

import type { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'

import { Card, CardBody } from './index'

const meta: Meta<typeof Card> = {
  title: 'element/Card',
  component: Card,
}

export default meta

type Story = StoryObj<typeof Card>

const Render = ({ children, ...props }: ComponentProps<typeof Card>) => {
  return (
    <Card {...props}>
      <CardBody>{children}</CardBody>
    </Card>
  )
}

export const Default: Story = {
  args: {
    hasBorder: true,
    theme: 'transparent',
    children: 'Card',
    scrollable: false,
  },
  render: (args) => <Render {...args} />,
}

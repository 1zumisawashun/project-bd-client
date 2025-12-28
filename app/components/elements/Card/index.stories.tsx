import type { Meta, StoryObj } from '@storybook/react'

import { ComponentProps, FC } from 'react'
import { Card, CardBody } from './index'

const meta: Meta<typeof Card> = {
  title: 'element/Card',
  component: Card,
}

export default meta

type Story = StoryObj<typeof Card>

const Render: FC<ComponentProps<typeof Card>> = ({ children, ...props }) => {
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

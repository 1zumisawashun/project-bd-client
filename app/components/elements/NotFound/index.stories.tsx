import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { NotFound } from './index'

const meta: Meta<typeof NotFound> = {
  title: 'element/NotFound',
  component: NotFound,
}

export default meta

type Story = StoryObj<typeof NotFound>

const Render: FC = () => {
  return <NotFound />
}

export const Default: Story = {
  render: () => <Render />,
}

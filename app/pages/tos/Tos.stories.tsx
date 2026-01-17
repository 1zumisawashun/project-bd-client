import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { Tos } from './Tos'

const meta: Meta<typeof Tos> = {
  title: 'feature/tos/Tos',
  component: Tos,
}
export default meta
type Story = StoryObj<typeof Tos>

const Render: FC = () => {
  return <Tos />
}
export const Default: Story = {
  render: () => <Render />,
}

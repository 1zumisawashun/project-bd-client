import type { Meta, StoryObj } from '@storybook/react'

import { LoadingSpinner } from './index'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'element/LoadingSpinner',
  component: LoadingSpinner,
}
export default meta
type Story = StoryObj<typeof LoadingSpinner>

const Render: React.FC = () => {
  return <LoadingSpinner />
}
export const Default: Story = {
  render: () => <Render />,
}

import type { Meta, StoryObj } from '@storybook/react'

import { Status } from './index'

const meta: Meta<typeof Status> = {
  title: 'element/Status',
  component: Status,
}
export default meta

type Story = StoryObj<typeof Status>

const Render: React.FC = () => {
  return (
    <Status title="title">
      descriptiondescriptiondescriptiondescriptiondescription
    </Status>
  )
}

export const Default: Story = {
  render: () => <Render />,
}

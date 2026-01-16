import { type Meta, type StoryObj } from '@storybook/react'

import { FC } from 'react'
import { LoadingSpinner } from './index'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'element/LoadingSpinner',
  component: LoadingSpinner,
}

export default meta

type Story = StoryObj<typeof LoadingSpinner>

const Render: FC = () => {
  return <LoadingSpinner />
}

export const Default: Story = {
  render: () => <Render />,
}

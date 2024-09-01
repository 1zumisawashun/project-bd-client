import { faq } from '@/features/faq/faq.constant'
import type { Meta, StoryObj } from '@storybook/react'

import { Nl2br } from './index'

const meta: Meta<typeof Nl2br> = {
  title: 'element/Nl2br',
  component: Nl2br,
}

export default meta

type Story = StoryObj<typeof Nl2br>

const Render: React.FC = () => {
  return <Nl2br>{faq}</Nl2br>
}
export const Default: Story = {
  render: () => <Render />,
}

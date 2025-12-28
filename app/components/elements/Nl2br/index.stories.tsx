import { faq } from '@/pages/faq/faq.constant'
import type { Meta, StoryObj } from '@storybook/react'

import { FC } from 'react'
import { Nl2br } from './index'

const meta: Meta<typeof Nl2br> = {
  title: 'element/Nl2br',
  component: Nl2br,
}

export default meta

type Story = StoryObj<typeof Nl2br>

const Render: FC = () => {
  return <Nl2br>{faq}</Nl2br>
}
export const Default: Story = {
  render: () => <Render />,
}

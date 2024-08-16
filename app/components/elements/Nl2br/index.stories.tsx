import { faq } from '@/features/faq/Faq.constant'
import type { Meta, StoryObj } from '@storybook/react'

import { Nl2br } from './index'

const meta: Meta<typeof Nl2br> = {
  title: 'elements/Nl2br',
  component: Nl2br,
}

export default meta

type Story = StoryObj<typeof Nl2br>

export const Default: Story = {
  args: {
    children: faq,
  },
}

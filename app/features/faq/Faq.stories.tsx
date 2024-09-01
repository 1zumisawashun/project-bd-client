import type { Meta, StoryObj } from '@storybook/react'

import { Faq } from './Faq'

const meta: Meta<typeof Faq> = {
  title: 'feature/faq/Faq',
  component: Faq,
}
export default meta
type Story = StoryObj<typeof Faq>

const Render: React.FC = () => {
  return <Faq />
}
export const Default: Story = {
  render: () => <Render />,
}

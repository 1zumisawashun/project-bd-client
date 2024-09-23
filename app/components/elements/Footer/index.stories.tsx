import type { Meta, StoryObj } from '@storybook/react'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'

import { Footer } from './index'

const meta: Meta<typeof Footer> = {
  title: 'layout/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
  decorators: [FullWidthDecorator],
}
export default meta
type Story = StoryObj<typeof Footer>

const Render: React.FC = () => {
  return <Footer />
}

export const Default: Story = {
  render: () => <Render />,
}

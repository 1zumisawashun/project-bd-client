import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'
import { Footer } from './index'

const meta: Meta<typeof Footer> = {
  title: 'element/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
  decorators: [FullWidthDecorator],
}
export default meta
type Story = StoryObj<typeof Footer>

const Render: FC = () => {
  return <Footer />
}

export const Default: Story = {
  render: () => <Render />,
}

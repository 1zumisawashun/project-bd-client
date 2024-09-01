import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from './SignIn'

const meta: Meta<typeof SignIn> = {
  title: 'feature/sign-in/SignIn',
  component: SignIn,
}
export default meta
type Story = StoryObj<typeof SignIn>

const Render: React.FC = () => {
  return <SignIn />
}
export const Default: Story = {
  render: () => <Render />,
}

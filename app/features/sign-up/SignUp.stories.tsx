import type { Meta, StoryObj } from '@storybook/react'

import { SignUp } from './SignUp'

const meta: Meta<typeof SignUp> = {
  title: 'feature/sign-up/SignUp',
  component: SignUp,
}
export default meta
type Story = StoryObj<typeof SignUp>

const Render: React.FC = () => {
  return <SignUp />
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}

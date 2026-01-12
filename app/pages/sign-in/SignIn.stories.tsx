import { type Meta, type StoryObj } from '@storybook/react'

import { FC } from 'react'
import { SignIn } from './SignIn'

const meta: Meta<typeof SignIn> = {
  title: 'feature/sign-in/SignIn',
  component: SignIn,
}
export default meta
type Story = StoryObj<typeof SignIn>

const Render: FC = () => {
  return <SignIn />
}
export const Default: Story = {
  render: () => <Render />,
}

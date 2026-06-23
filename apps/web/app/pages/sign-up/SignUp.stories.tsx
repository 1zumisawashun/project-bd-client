import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { SignUp } from './SignUp'

const meta: Meta<typeof SignUp> = {
  title: 'feature/sign-up/SignUp',
  component: SignUp,
}
export default meta
type Story = StoryObj<typeof SignUp>

const Render: FC = () => {
  return <SignUp />
}
export const Default: Story = {
  render: () => <Render />,
}

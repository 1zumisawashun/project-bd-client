import type { Meta, StoryObj } from '@storybook/react'

import { Toast } from './index'
import { useToast } from './hooks/useToast'
import { Button } from '../../buttons/Button'

const meta: Meta<typeof Toast> = {
  title: 'element/Toast',
  component: Toast,
}

export default meta

type Story = StoryObj<typeof Toast>

function Render() {
  const { isOpen, close, handleClick } = useToast()
  return (
    <>
      <Button onClick={handleClick}>Click me</Button>
      <Toast isOpen={isOpen} close={close} />
    </>
  )
}

export const Default: Story = {
  args: {},
  render: Render,
}

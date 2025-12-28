import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/buttons/Button'
import { FC } from 'react'
import { HamburgerMenu } from './index'

const meta: Meta<typeof HamburgerMenu> = {
  title: 'element/HamburgerMenu',
  component: HamburgerMenu,
}
export default meta
type Story = StoryObj<typeof HamburgerMenu>

const Render: FC = () => {
  return (
    <HamburgerMenu
      render={() => (
        <>
          <Button variant="ghost">Item 1</Button>
          <Button variant="ghost">Item 2</Button>
          <Button variant="ghost">Item 3</Button>
        </>
      )}
    />
  )
}

export const Default: Story = {
  render: () => <Render />,
}

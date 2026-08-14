import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { MenuItem } from '../Menu'
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
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </>
      )}
    />
  )
}

export const Default: Story = {
  render: () => <Render />,
}

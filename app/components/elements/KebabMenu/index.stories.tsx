import type { Meta, StoryObj } from '@storybook/react'

import { FC } from 'react'
import { MenuItem } from '../Menu'
import { KebabMenu } from './index'

const meta: Meta<typeof KebabMenu> = {
  title: 'element/KebabMenu',
  component: KebabMenu,
}

export default meta

type Story = StoryObj<typeof KebabMenu>

const Render: FC = () => {
  return (
    <KebabMenu
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

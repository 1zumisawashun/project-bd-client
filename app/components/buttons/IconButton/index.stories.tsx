import type { Meta, StoryObj } from '@storybook/react'

import {
  Cross1Icon,
  HamburgerMenuIcon,
  PlusIcon,
  HeartIcon,
  HeartFilledIcon,
} from '@radix-ui/react-icons'
import { IconButton } from './index'
import { items } from '../buttons.constant'

const meta: Meta<typeof IconButton> = {
  title: 'button/IconButton',
  component: IconButton,
}

export default meta

type Story = StoryObj<typeof IconButton>

function Render() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {items.map((item) => (
        <div
          style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}
          key={item.id}
        >
          <IconButton variant={item.variant} theme={item.theme}>
            <Cross1Icon />
          </IconButton>
          <IconButton variant={item.variant} theme={item.theme} id="hover">
            <HamburgerMenuIcon />
          </IconButton>
          <IconButton variant={item.variant} theme={item.theme} id="active">
            <PlusIcon />
          </IconButton>
          <IconButton
            variant={item.variant}
            theme={item.theme}
            id="focus-visible"
          >
            <HeartIcon />
          </IconButton>
          <IconButton variant={item.variant} theme={item.theme} disabled>
            <HeartFilledIcon />
          </IconButton>
        </div>
      ))}
    </div>
  )
}

export const Default: Story = {
  args: {},
  render: Render,
}

import type { Meta, StoryObj } from '@storybook/react'

import {
  Cross1Icon,
  HamburgerMenuIcon,
  PlusIcon,
  HeartIcon,
  HeartFilledIcon,
} from '@radix-ui/react-icons'
import { IconButton } from './index'

const meta: Meta<typeof IconButton> = {
  title: 'IconButton',
  component: IconButton,
}

export default meta

type Story = StoryObj<typeof IconButton>

function Render() {
  const items = [
    { id: 1, variant: 'contained', theme: 'primary' },
    { id: 2, variant: 'outlined', theme: 'primary' },
    { id: 3, variant: 'contained', theme: 'danger' },
    { id: 4, variant: 'outlined', theme: 'danger' },
  ] as const

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

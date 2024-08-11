import type { Meta, StoryObj } from '@storybook/react'

import {
  Cross1Icon,
  HamburgerMenuIcon,
  HeartIcon,
  HeartFilledIcon,
  PlusIcon
} from '@radix-ui/react-icons'
import { IconAnchorButton } from './index'

const meta: Meta<typeof IconAnchorButton> = {
  title: 'button/IconAnchorButton',
  component: IconAnchorButton,
}

export default meta

type Story = StoryObj<typeof IconAnchorButton>

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
          <IconAnchorButton href="#" variant={item.variant} theme={item.theme}>
            <Cross1Icon />
          </IconAnchorButton>
          <IconAnchorButton
            href="#"
            variant={item.variant}
            theme={item.theme}
            id="hover"
          >
            <HamburgerMenuIcon />
          </IconAnchorButton>
          <IconAnchorButton
            href="#"
            variant={item.variant}
            theme={item.theme}
            id="active"
          >
            <PlusIcon />
          </IconAnchorButton>
          <IconAnchorButton
            href="#"
            variant={item.variant}
            theme={item.theme}
            id="focus-visible"
          >
            <HeartIcon />
          </IconAnchorButton>
          <IconAnchorButton
            href="#"
            variant={item.variant}
            theme={item.theme}
            disabled
          >
            <HeartFilledIcon />
          </IconAnchorButton>
        </div>
      ))}
    </div>
  )
}

export const Default: Story = {
  args: {},
  render: Render,
}

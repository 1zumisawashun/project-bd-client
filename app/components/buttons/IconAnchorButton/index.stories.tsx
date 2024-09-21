import type { Meta, StoryObj } from '@storybook/react'

import {
  Cross1Icon,
  HamburgerMenuIcon,
  HeartIcon,
  HeartFilledIcon,
  PlusIcon,
} from '@radix-ui/react-icons'
import { VStack } from '@/components/layouts/VStack'
import { HStack } from '@/components/layouts/HStack'
import { IconAnchorButton } from './index'
import { items } from '../buttons.constant'

const meta: Meta<typeof IconAnchorButton> = {
  title: 'button/IconAnchorButton',
  component: IconAnchorButton,
}

export default meta

type Story = StoryObj<typeof IconAnchorButton>

const Render: React.FC = () => {
  return (
    <VStack>
      {items.map((item) => (
        <HStack key={item.id}>
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
        </HStack>
      ))}
    </VStack>
  )
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}

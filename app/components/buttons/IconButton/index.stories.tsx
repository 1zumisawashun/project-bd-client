import type { Meta, StoryObj } from '@storybook/react'

import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import {
  Cross1Icon,
  HamburgerMenuIcon,
  HeartFilledIcon,
  HeartIcon,
  PlusIcon,
} from '@radix-ui/react-icons'
import { items } from '../buttons.constant'
import { IconButton } from './index'

const meta: Meta<typeof IconButton> = {
  title: 'button/IconButton',
  component: IconButton,
}
export default meta
type Story = StoryObj<typeof IconButton>

const Render: React.FC = () => {
  return (
    <VStack>
      {items.map((item) => (
        <HStack key={item.id}>
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
        </HStack>
      ))}
    </VStack>
  )
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}

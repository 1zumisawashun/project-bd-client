import { type Meta, type StoryObj } from '@storybook/react'

import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import {
  Cross1Icon,
  HamburgerMenuIcon,
  HeartFilledIcon,
  HeartIcon,
  PlusIcon,
} from '@radix-ui/react-icons'
import { FC } from 'react'
import { IconAnchorButton } from './index'

const items = [
  { id: 1, variant: 'contained', theme: 'primary' },
  { id: 2, variant: 'outlined', theme: 'primary' },
  { id: 3, variant: 'ghost', theme: 'primary' },
]

const meta: Meta<typeof IconAnchorButton> = {
  title: 'button/IconAnchorButton',
  component: IconAnchorButton,
}

export default meta

type Story = StoryObj<typeof IconAnchorButton>

const Render: FC = () => {
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
  render: () => <Render />,
}

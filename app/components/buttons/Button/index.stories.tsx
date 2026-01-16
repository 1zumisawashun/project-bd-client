import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'
import { PlusIcon } from '@radix-ui/react-icons'
import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { Button } from './index'

const items = [
  { id: 1, variant: 'contained', theme: 'primary' },
  { id: 2, variant: 'outlined', theme: 'primary' },
  { id: 3, variant: 'ghost', theme: 'primary' },
]

const meta: Meta<typeof Button> = {
  title: 'button/Button',
  component: Button,
  decorators: [FullWidthDecorator],
}

export default meta

type Story = StoryObj<typeof Button>

const Render: FC = () => {
  return (
    <VStack>
      {items.map((item) => (
        <HStack key={item.id}>
          <Button variant={item.variant} theme={item.theme}>
            default
          </Button>
          <Button
            variant={item.variant}
            theme={item.theme}
            prefix={<PlusIcon />}
          >
            prefix
          </Button>
          <Button
            variant={item.variant}
            theme={item.theme}
            suffix={<PlusIcon />}
          >
            suffix
          </Button>
          <Button variant={item.variant} theme={item.theme} id="hover">
            hover
          </Button>
          <Button variant={item.variant} theme={item.theme} id="active">
            active
          </Button>
          <Button variant={item.variant} theme={item.theme} id="focus-visible">
            focus visible
          </Button>
          <Button variant={item.variant} theme={item.theme} disabled>
            disabled
          </Button>
        </HStack>
      ))}
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}

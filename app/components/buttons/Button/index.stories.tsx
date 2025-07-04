import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'
import { PlusIcon } from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import { items } from '../buttons.constant'
import { Button } from './index'

const meta: Meta<typeof Button> = {
  title: 'button/Button',
  component: Button,
  decorators: [FullWidthDecorator],
}
export default meta
type Story = StoryObj<typeof Button>

const Render: React.FC = () => {
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
  args: {},
  render: () => <Render />,
}

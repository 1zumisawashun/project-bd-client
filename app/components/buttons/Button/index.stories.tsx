import type { Meta, StoryObj } from '@storybook/react'
import { PlusIcon } from '@radix-ui/react-icons'
import { VStack } from '@/components/elements/VStack'
import { HStack } from '@/components/elements/HStack'
import { Button } from './index'
import { items } from '../buttons.constant'

const meta: Meta<typeof Button> = {
  title: 'button/Button',
  component: Button,
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

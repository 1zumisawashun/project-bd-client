import type { Meta, StoryObj } from '@storybook/react'
import { PlusIcon } from '@radix-ui/react-icons'
import { VStack } from '@/components/layouts/VStack'
import { HStack } from '@/components/layouts/HStack'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'
import { AnchorButton } from './index'
import { items } from '../buttons.constant'

const meta: Meta<typeof AnchorButton> = {
  title: 'button/AnchorButton',
  component: AnchorButton,
  decorators: [FullWidthDecorator],
}
export default meta
type Story = StoryObj<typeof AnchorButton>

const Render: React.FC = () => {
  return (
    <VStack>
      {items.map((item) => (
        <HStack key={item.id}>
          <AnchorButton href="#" variant={item.variant} theme={item.theme}>
            default
          </AnchorButton>
          <AnchorButton
            href="#"
            variant={item.variant}
            theme={item.theme}
            prefix={<PlusIcon />}
          >
            prefix
          </AnchorButton>
          <AnchorButton
            href="#"
            variant={item.variant}
            theme={item.theme}
            suffix={<PlusIcon />}
          >
            suffix
          </AnchorButton>
          <AnchorButton
            href="#"
            variant={item.variant}
            theme={item.theme}
            id="hover"
          >
            hover
          </AnchorButton>
          <AnchorButton
            href="#"
            variant={item.variant}
            theme={item.theme}
            id="active"
          >
            active
          </AnchorButton>
          <AnchorButton
            href="#"
            variant={item.variant}
            theme={item.theme}
            id="focus-visible"
          >
            focus visible
          </AnchorButton>
          <AnchorButton
            href="#"
            variant={item.variant}
            theme={item.theme}
            disabled
          >
            disabled
          </AnchorButton>
        </HStack>
      ))}
    </VStack>
  )
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}

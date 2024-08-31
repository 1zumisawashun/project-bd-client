import type { Meta, StoryObj } from '@storybook/react'
import { VStack } from '@/components/elements/VStack'
import { ExternalLinkIcon } from '@radix-ui/react-icons'

import { Link } from './index'

const meta: Meta<typeof Link> = {
  title: 'element/Link',
  component: Link,
}
export default meta
type Story = StoryObj<typeof Link>

const Render: React.FC = () => {
  return (
    <VStack>
      <Link href="/">default</Link>
      <Link href="/" id="hover">
        hover
      </Link>
      <Link href="/" disabled>
        disabled
      </Link>
      <Link href="/" prefix={<ExternalLinkIcon />}>
        prefix
      </Link>
      <Link href="/" suffix={<ExternalLinkIcon />}>
        suffix
      </Link>
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}

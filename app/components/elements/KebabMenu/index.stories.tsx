import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/buttons/Button'
import { KebabMenu } from './index'

const meta: Meta<typeof KebabMenu> = {
  title: 'element/KebabMenu',
  component: KebabMenu,
}
export default meta
type Story = StoryObj<typeof KebabMenu>

const Render: React.FC = () => {
  return (
    <KebabMenu
      render={() => (
        <>
          <Button variant="ghost">Item 1</Button>
          <Button variant="ghost">Item 2</Button>
          <Button variant="ghost">Item 3</Button>
        </>
      )}
    />
  )
}

export const Default: Story = {
  render: () => <Render />,
}

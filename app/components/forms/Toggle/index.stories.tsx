import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '../../elements/Label/index'
import { Toggle, ToggleGroup } from './index'

const meta: Meta<typeof Toggle> = {
  title: 'form/Toggle',
  component: Toggle,
}
export default meta
type Story = StoryObj<typeof Toggle>

const Render: React.FC = () => {
  return (
    <ToggleGroup defaultValue={['left']}>
      <Toggle value="left">
        <Label>ToggleGroupItem 1</Label>
      </Toggle>
      <Toggle value="right">
        <Label>ToggleGroupItem 2</Label>
      </Toggle>
    </ToggleGroup>
  )
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}

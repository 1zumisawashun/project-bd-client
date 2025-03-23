import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '../../elements/Label/index'
import { ToggleGroup, ToggleGroupItem } from './index'

const meta: Meta<typeof ToggleGroup> = {
  title: 'form/ToggleGroup',
  component: ToggleGroup,
}
export default meta
type Story = StoryObj<typeof ToggleGroup>

const ToggleGroupRender: React.FC = () => {
  return (
    <ToggleGroup defaultValue="1">
      <ToggleGroupItem value="1">
        <Label>ToggleGroupItem 1</Label>
      </ToggleGroupItem>
      <ToggleGroupItem value="2">
        <Label>ToggleGroupItem 2</Label>
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export const Default: Story = {
  args: {},
  render: () => <ToggleGroupRender />,
}

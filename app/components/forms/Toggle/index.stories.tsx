import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { Card, CardBody } from '@/components/elements/Card'
import { VStack } from '@/components/layouts/VStack'
import { HeartFilledIcon, HeartOutlineIcon } from '../../elements/Icon'
import { Label } from '../../elements/Label/index'
import { Toggle, ToggleGroup } from './index'

const meta: Meta<typeof Toggle> = {
  title: 'form/Toggle',
  component: Toggle,
}

export default meta

type Story = StoryObj<typeof Toggle>

const Multiple: FC = () => {
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

const Single: FC = () => {
  return (
    <Toggle
      aria-label="Favorite"
      render={(props, state) => {
        if (state.pressed) {
          return (
            <button type="button" {...props}>
              <HeartFilledIcon />
            </button>
          )
        }

        return (
          <button type="button" {...props}>
            <HeartOutlineIcon />
          </button>
        )
      }}
    />
  )
}

const Render: FC = () => {
  return (
    <VStack>
      <Card>
        <CardBody>
          <Multiple />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Single />
        </CardBody>
      </Card>
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}

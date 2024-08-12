import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './index'
import { items } from '../buttons.constant'

const meta: Meta<typeof Button> = {
  title: 'button/Button',
  component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

function Render() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {items.map((item) => (
        <div
          style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}
          key={item.id}
        >
          <Button variant={item.variant} theme={item.theme}>
            default
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
        </div>
      ))}
    </div>
  )
}

export const Default: Story = {
  args: {},
  render: Render,
}

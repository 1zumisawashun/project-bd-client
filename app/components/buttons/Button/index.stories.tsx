import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './index'

const meta: Meta<typeof Button> = {
  title: 'button/Button',
  component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

function Render() {
  const items = [
    { id: 1, variant: 'contained', theme: 'primary' },
    { id: 2, variant: 'outlined', theme: 'primary' },
    { id: 3, variant: 'contained', theme: 'danger' },
    { id: 4, variant: 'outlined', theme: 'danger' },
  ] as const

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

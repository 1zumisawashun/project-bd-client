import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { Nl2br } from './index'

const meta: Meta<typeof Nl2br> = {
  title: 'element/Nl2br',
  component: Nl2br,
}

export default meta

type Story = StoryObj<typeof Nl2br>

const sampleText = `1行目のテキストです。\n2行目のテキストです。\n3行目のテキストです。`

const Render: FC = () => {
  return <Nl2br>{sampleText}</Nl2br>
}

export const Default: Story = {
  render: () => <Render />,
}

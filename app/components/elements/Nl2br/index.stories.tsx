import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { FAQ } from '@/pages/faq/faq.constants'
import { Nl2br } from './index'

const meta: Meta<typeof Nl2br> = {
  title: 'element/Nl2br',
  component: Nl2br,
}

export default meta

type Story = StoryObj<typeof Nl2br>

const Render: FC = () => {
  return <Nl2br>{FAQ}</Nl2br>
}

export const Default: Story = {
  render: () => <Render />,
}

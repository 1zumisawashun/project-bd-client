import type { Meta, StoryObj } from '@storybook/react'

import { TopPage } from './TopPage'

const meta: Meta<typeof TopPage> = {
  title: 'feature/top-page/TopPage',
  component: TopPage,
}
export default meta
type Story = StoryObj<typeof TopPage>

const Render: React.FC = () => {
  return <TopPage />
}
export const Default: Story = {
  render: () => <Render />,
}

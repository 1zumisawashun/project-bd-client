import type { Meta, StoryObj } from '@storybook/react'

import { CssModulesSample } from './CssModulesSample'

const meta: Meta<typeof CssModulesSample> = {
  title: 'sample/CssModulesSample',
  component: CssModulesSample,
}
export default meta
type Story = StoryObj<typeof CssModulesSample>

const Render: React.FC = () => {
  return <CssModulesSample />
}

export const Default: Story = {
  render: () => <Render />,
}

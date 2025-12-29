import type { Meta, StoryObj } from '@storybook/react'

import { FC } from 'react'
import { Tabs, TabsTab, TabsList, TabsPanel } from './index'

const meta: Meta<typeof Tabs> = {
  title: 'element/Tabs',
  component: Tabs,
}

export default meta

type Story = StoryObj<typeof Tabs>

const Render: FC = () => {
  return (
    <Tabs defaultValue="tab1" orientation="vertical">
      <TabsList>
        <TabsTab value="tab1">Tab1</TabsTab>
        <TabsTab value="tab2">Tab2</TabsTab>
        <TabsTab value="tab3">Tab3</TabsTab>
      </TabsList>
      <TabsPanel value="tab1">Content1</TabsPanel>
      <TabsPanel value="tab2">Content2</TabsPanel>
      <TabsPanel value="tab3">Content3</TabsPanel>
    </Tabs>
  )
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}

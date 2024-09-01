import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './index'

const meta: Meta<typeof Tabs> = {
  title: 'element/Tabs',
  component: Tabs,
}
export default meta
type Story = StoryObj<typeof Tabs>

const Render: React.FC = () => {
  return (
    <Tabs defaultValue="tab1" orientation="vertical">
      <TabsList>
        <TabsTrigger value="tab1">Tab1</TabsTrigger>
        <TabsTrigger value="tab2">Tab2</TabsTrigger>
        <TabsTrigger value="tab3">Tab3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content1</TabsContent>
      <TabsContent value="tab2">Content2</TabsContent>
      <TabsContent value="tab3">Content3</TabsContent>
    </Tabs>
  )
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}

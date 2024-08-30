import type { Meta, StoryObj } from '@storybook/react'

import { Breadcrumb, BreadcrumbLink } from './index'

const meta: Meta<typeof Breadcrumb> = {
  title: 'element/Breadcrumb',
  component: Breadcrumb,
}
export default meta
type Story = StoryObj<typeof Breadcrumb>

const Render: React.FC = () => {
  return (
    <Breadcrumb href="#">
      <BreadcrumbLink href="#">トップページ</BreadcrumbLink>
      <BreadcrumbLink href="#">記事一覧</BreadcrumbLink>
      <BreadcrumbLink href="#" isCurrent>
        記事詳細
      </BreadcrumbLink>
    </Breadcrumb>
  )
}

export const Default: Story = {
  render: () => <Render />,
}

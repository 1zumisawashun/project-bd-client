import type { Meta, StoryObj } from '@storybook/react'

import { VStack } from '@/components/elements/VStack'
import { Breadcrumb, BreadcrumbLink } from './index'
import { Card, CardBody } from '../Card'

const meta: Meta<typeof Breadcrumb> = {
  title: 'element/Breadcrumb',
  component: Breadcrumb,
}
export default meta
type Story = StoryObj<typeof Breadcrumb>

const Render: React.FC = () => {
  return (
    <VStack>
      <Card>
        <CardBody>
          <Breadcrumb href="#">
            <BreadcrumbLink href="#">トップページ</BreadcrumbLink>
            <BreadcrumbLink href="#">記事一覧</BreadcrumbLink>
            <BreadcrumbLink href="#" isCurrent>
              記事詳細
            </BreadcrumbLink>
          </Breadcrumb>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Breadcrumb>
            <BreadcrumbLink href="#">トップページ</BreadcrumbLink>
            <BreadcrumbLink href="#">記事一覧</BreadcrumbLink>
            <BreadcrumbLink href="#" isCurrent>
              記事詳細
            </BreadcrumbLink>
          </Breadcrumb>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Breadcrumb>
            <BreadcrumbLink href="#" isCurrent>
              トップページ
            </BreadcrumbLink>
          </Breadcrumb>
        </CardBody>
      </Card>
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}

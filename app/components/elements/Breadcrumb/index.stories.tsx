import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { VStack } from '@/components/layouts/VStack'
import { Card, CardBody } from '../Card'
import { Breadcrumb, BreadcrumbLink } from './index'

const meta: Meta<typeof Breadcrumb> = {
  title: 'element/Breadcrumb',
  component: Breadcrumb,
}

export default meta

type Story = StoryObj<typeof Breadcrumb>

const Render: FC = () => {
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

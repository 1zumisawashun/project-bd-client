import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'
import { type Meta, type StoryObj } from '@storybook/react'

import { CONTENT } from '@/drizzle/constants/articles'
import { FC } from 'react'
import { ArticleCreate } from './ArticleCreate'

const meta: Meta<typeof ArticleCreate> = {
  title: 'feature/articles/ArticleCreate',
  component: ArticleCreate,
  parameters: { layout: 'fullscreen' },
  decorators: [FullWidthDecorator],
}

export default meta

type Story = StoryObj<typeof ArticleCreate>

const Render: FC = () => {
  return (
    <ArticleCreate
      defaultValues={{
        title: '',
        content: CONTENT,
        categories: [],
        status: 'PUBLISHED',
      }}
      categoryOptions={['JavaScript', 'TypeScript', 'React']}
    />
  )
}
export const Default: Story = {
  render: () => <Render />,
}

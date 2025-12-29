import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/elements/Tabs'
import { User } from '@/functions/types'
import { FC } from 'react'
import { MyPageArticleCard } from './components/myPageArticleCard/MyPageArticleCard'
import { MyPageSetting } from './components/myPageSetting/MyPageSetting'

type Props = {
  user: User
}
export const MyPage: FC<Props> = ({ user }) => {
  const published =
    user?.posts?.filter((post) => post.status === 'PUBLISHED') ?? []

  const draft = user?.posts?.filter((post) => post.status === 'DRAFT') ?? []

  const liked = user?.likedArticles ?? []

  return (
    <Tabs defaultValue="setting">
      <TabsList>
        <TabsTab value="setting">設定</TabsTab>
        <TabsTab value="published">公開中</TabsTab>
        <TabsTab value="draft">下書き</TabsTab>
        <TabsTab value="like">いいね</TabsTab>
      </TabsList>
      <TabsPanel value="setting">
        <MyPageSetting user={user} />
      </TabsPanel>
      <TabsPanel value="published">
        <MyPageArticleCard articles={published} />
      </TabsPanel>
      <TabsPanel value="draft">
        <MyPageArticleCard articles={draft} />
      </TabsPanel>
      <TabsPanel value="like">
        <MyPageArticleCard articles={liked} />
      </TabsPanel>
    </Tabs>
  )
}

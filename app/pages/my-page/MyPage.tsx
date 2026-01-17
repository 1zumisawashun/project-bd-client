import { FC } from 'react'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/elements/Tabs'
import { MyPageArticleCard } from './components/myPageArticleCard/MyPageArticleCard'
import { MyPageSetting } from './components/myPageSetting/MyPageSetting'
import { MypageUser } from './myPage.types'

type MyPageProps = {
  user: MypageUser
}

export const MyPage: FC<MyPageProps> = ({ user }) => {
  const { posts, likedArticles } = user
  const published = posts?.filter(({ status }) => status === 'PUBLISHED') ?? []
  const draft = posts?.filter(({ status }) => status === 'DRAFT') ?? []
  const liked = likedArticles.map(({ article }) => article) ?? []

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

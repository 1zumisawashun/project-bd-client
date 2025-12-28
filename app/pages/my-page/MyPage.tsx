import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/elements/Tabs'
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
        <TabsTrigger value="setting">設定</TabsTrigger>
        <TabsTrigger value="published">公開中</TabsTrigger>
        <TabsTrigger value="draft">下書き</TabsTrigger>
        <TabsTrigger value="like">いいね</TabsTrigger>
      </TabsList>
      <TabsContent value="setting">
        <MyPageSetting user={user} />
      </TabsContent>
      <TabsContent value="published">
        <MyPageArticleCard articles={published} />
      </TabsContent>
      <TabsContent value="draft">
        <MyPageArticleCard articles={draft} />
      </TabsContent>
      <TabsContent value="like">
        <MyPageArticleCard articles={liked} />
      </TabsContent>
    </Tabs>
  )
}

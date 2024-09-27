import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/elements/Tabs'
import { User } from '@/functions/types'
import { MyPagePost } from './MypagePost/MyPagePost'
import { MyPageSetting } from './MyPageSetting/MyPageSetting'

type Props = {
  user: User
}
export const MyPage: React.FC<Props> = ({ user }) => {
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
        <TabsTrigger value="like">お気に入り</TabsTrigger>
      </TabsList>
      <TabsContent value="setting">
        <MyPageSetting user={user} />
      </TabsContent>
      <TabsContent value="published">
        <MyPagePost articles={published} />
      </TabsContent>
      <TabsContent value="draft">
        <MyPagePost articles={draft} />
      </TabsContent>
      <TabsContent value="like">
        <MyPagePost articles={liked} />
      </TabsContent>
    </Tabs>
  )
}

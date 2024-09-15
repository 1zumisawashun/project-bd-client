import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/elements/Tabs'
import { MyPagePost } from './MypagePost/MyPagePost'
import { MyPageSetting } from './MyPageSetting/MyPageSetting'
import { User } from './myPage.type'

export const MyPage: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Tabs defaultValue="setting">
      <TabsList>
        <TabsTrigger value="setting">setting</TabsTrigger>
        <TabsTrigger value="post">post</TabsTrigger>
      </TabsList>
      <TabsContent value="setting">
        <MyPageSetting user={user} />
      </TabsContent>
      <TabsContent value="post">
        <MyPagePost articles={user.posts} />
      </TabsContent>
    </Tabs>
  )
}

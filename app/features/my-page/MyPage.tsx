import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/elements/Tabs'
import { MyPagePost } from './components/MyPagePost'
import { MyPageSetting } from './components/MyPageSetting'

export const MyPage: React.FC = () => {
  return (
    <Tabs defaultValue="setting">
      <TabsList>
        <TabsTrigger value="setting">setting</TabsTrigger>
        <TabsTrigger value="post">post</TabsTrigger>
      </TabsList>
      <TabsContent value="setting">
        <MyPageSetting />
      </TabsContent>
      <TabsContent value="post">
        <MyPagePost />
      </TabsContent>
    </Tabs>
  )
}

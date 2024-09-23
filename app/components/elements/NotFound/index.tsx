import { Status } from '../Status'

export const NotFound: React.FC = () => {
  return (
    <Status title="記事が見つかりませんでした" status="empty">
      お探しの記事は存在しないか、削除された可能性があります。
    </Status>
  )
}

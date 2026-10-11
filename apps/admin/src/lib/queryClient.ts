import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // NOTE: admin-apiが401/403を返すケースはルートガード（__root.tsx）側で処理するため、
      // クエリ自体のリトライは無効化しておく（リトライしても結果は変わらない）
      retry: false,
    },
  },
});

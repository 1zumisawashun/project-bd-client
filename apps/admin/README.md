# apps/admin（TanStack Router SPA）

Next.js App Router から TanStack Router（Vite SPA）への移行の、最初の実装パターン。
`apps/web` の移行（issue #129 の後続sub-issue）でもこの構成を再利用する想定。

## 構成

- **`apps/admin`**（このディレクトリ） — 画面を描画するだけのクライアントSPA。サーバー処理は持たない。
- **`apps/admin-api`** — 旧 `apps/admin`。next-auth・Drizzleをそのまま使う「API専業」のNext.jsアプリ。
  `app/api/**/route.ts` だけを持ち、ページレンダリングは行わない。

旧 `apps/admin`（Next.js, Server Component + Server Action）は両方に分解された。
DBアクセス・認証チェックは `apps/admin-api` 側に残り、画面とフォーム操作は `apps/admin` に移った。

## 同一オリジン化

next-authのセッションcookieを素直に使うため、SPAとAPIは常に同一オリジンに見せる。

- **ローカル開発**: `apps/admin` の Vite dev server が `/api/*` を `apps/admin-api`
  （デフォルト `http://localhost:3001`、`.env.local` の `ADMIN_API_ORIGIN` で変更可）へ
  プロキシする（`vite.config.ts`）。
- **本番(Vercel)**: `vercel.json` の `rewrites` で `/api/*` を `$ADMIN_API_ORIGIN` （Vercel
  プロジェクトの環境変数）へ転送する。実際にどのVercelプロジェクト構成にするか
  （`apps/admin`・`apps/admin-api` をどう配線するか）は #137（CI・デプロイ設定の更新）で確定する。

## 認証・ルートガード

旧 `apps/admin/app/page.tsx` は `getSession()` → ロール判定 → `redirect()` という
サーバーサイドのガードだった。SPAにサーバーサイドレンダリングは無いため、このガードは
「APIレスポンスのステータスに応じたリダイレクト」に置き換えている。

- `apps/admin-api/app/api/categories/route.ts` が401（未ログイン）/403（非管理者）を返す。
- `apps/admin/src/routes/index.tsx` の `loader` がその場でAPIを呼び、401/403を検知したら
  `window.location.href` でweb側（別オリジン）の該当ページへハードナビゲートする
  （TanStack Routerの内部 `redirect()` はアプリ内遷移専用なので使わない）。

新しいルートを追加する場合も、この「APIが401/403を返す → loaderで検知してリダイレクト」という
形を踏襲する。

## データ取得・ミューテーション

- TanStack Queryを導入。クエリ定義は機能ごとに `*.queries.ts` に集約する
  （例: `src/features/categories/categories.queries.ts`）。
- ルートの `loader` で `queryClient.ensureQueryData(...)` し、コンポーネント側では
  `useSuspenseQuery(...)` で同じ `queryOptions` を読む（ルートガードで使ったものと
  コンポーネントで使うものを同一にすることで、ローディング状態を二重に持たない）。
- ミューテーション（作成・更新・削除）は `useMutation` + 成功時に
  `queryClient.invalidateQueries` で該当クエリを無効化する。Server Actionの
  `revalidatePath` に相当する役割。

## 既知の制約（今回のスコープ外）

- `@project-bd-client/ui` の `export *` バレル（`index.ts`）は、使っていないコンポーネント
  （tiptapエディタ等）までモジュール評価の対象にしてしまうため、`Button`/`TextInput` だけを
  使うこのアプリでもビルドバンドルが大きくなる（624KB、未分割）。パッケージ全体を
  サブパス単位に分割するのは今回のスコープ外とし、将来の改善候補として記録する。
- 本番のVercel構成（プロジェクト分割・環境変数の実値）は #137 で確定する。

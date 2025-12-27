# project-bd-client

project-bdのリポジトリです

## 環境構築の手順

- クローンして VSCodeを開く

```bash
$ gh repo clone 1zumisawashun/project-bd-client
$ cd project-bd-client
$ code .
```

- envファイルを生成する（必要な秘匿情報は[こちら](https://github.com/1zumisawashun)から参照してください）

```bash
$ cp .env.local.example .env.local
```

- パッケージをインストールする

```bash
$ npm install
```

- ローカル開発用 [URL](http://localhost:3000) を開き動作確認をする

```bash
$ npm run dev
```

上記の手順で失敗する場合 [Troubleshoot](#Troubleshoot)を確認してください

## ディレクトリ構成

以下を参照してください

See [Configuration Reference](https://github.com/1zumisawashun/folder-structure-template).

## ERD

以下を参照してください

See [Configuration Reference](https://github.com/1zumisawashun/project-bd-client/blob/main/prisma/schema.md).

## 使用技術

**Before**

```
- frontend : Next.js App Router
- backend : Next.js Route Handler
- orm : Prisma
- database : Supabase
- ui : Radix UI + CSS Modules
- auth : NextAuth
- test : Jest + react-testing-library
- hosting : Vercel
```

**After**

```
- frontend : Next.js App Router
- backend : Next.js Route Handler
- orm : Drizzle
- database : PGlite
- ui : Base UI + CSS Modules
- auth : NextAuth
- test : Vitest + react-testing-library, Playwright
- Lefthook, Eslint, Oxlint, Oxfmt
- hosting : Vercel
```

## Troubleshoot

### デプロイが失敗する

Supabaseをhobbyプランで使用しているため定期的に稼働させないとロックされます。Supabaseのダッシュボードでリストアさせてください。

### nodeエラーが発生する

nodeのバージョンを本案件のバージョンに合わせてください。nodeのバージョン管理ツールをVoltaに設定している場合は不要です。

## その他ドキュメント

See [Configuration Reference](https://github.com/1zumisawashun).

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

null

## 使用技術

**Before**

```
- frontend : Next.js App Router
- backend : Next.js Route Handler
- orm : Prisma
- database : Supabase
- ui : Radix UI, CSS Modules
- auth : NextAuth
- test : Jest, react-testing-library
- hosting : Vercel
```

**After**

```
- frontend : Next.js App Router
- backend : Next.js Route Handler
- orm : Drizzle
- database : SQLite（Cloudflare D1）
- ui : Base UI, CSS Modules
- auth : NextAuth
- test : Vitest, react-testing-library, Playwright
- hosting : Cloudflare Workers
```

## TODO

- import db from '@/functions/libs/drizzle/client' を db dir に集約させる
- QueryAPI to SQL-like API
- shared は I/F を datasource に依存させない方が良さそう
  - ディレクトリのテンプレートに記載済み
  - プリミティブであればdatasourceに依存させなくても良さそう？
- ENV読み込めていないので修正する

## Troubleshoot

null

## その他ドキュメント

See [Configuration Reference](https://github.com/1zumisawashun).

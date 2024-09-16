# project-bd-client

project-bdのリポジトリです

## 環境構築の手順

- クローンして VSCodeを開く

```bash
$ git clone git@github.com:1zumisawashun/project-bd-client.git
$ cd project-bd-client
$ code .
```

- envファイルを生成する（必要な秘匿情報は[こちら]()から参照してください）

```bash
$ cp .env.example .env
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

See [Configuration Reference](https://github.com/1zumisawashun/folder-structure-template).

## ERD

See [Configuration Reference](https://github.com/1zumisawashun/project-bd-client/blob/main/prisma/schema.md).

## 使用技術

```
- frontend : Next.js App Router
- backend : Next.js Route Handler
- orm : Prisma
- database : Supabase
- ui : Radix UI + CSS Modules
- auth : NextAuth
- test : Jest + react-testing-library
- hosting : Vercel
- other : react-hook-form, zod, tiptap, Storybook, Chromatic
```

## Troubleshoot

### デプロイが失敗する

Supabaseをhobbyプランで使用しているため定期的に稼働させないとロックされます。  
Supabaseのダッシュボードでリストアさせてください。

### nodeエラーが発生する

nodeのバージョンを本案件のバージョンに合わせてください。  
nodeのバージョン管理ツールをVoltaに設定している場合は不要です。

## その他ドキュメント

See [Configuration Reference]().

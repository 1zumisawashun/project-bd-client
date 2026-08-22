---
name: implement
description: すでにスコープされた1件のGitHub issueを、ブランチ作成・実装・検証・commit・PR作成までend-to-endで実装する。多くの場合 /breakdown で作られたsub-issueに対して使う。特定のissue/sub-issueを実装したいとき、または明示的に /implement を呼んだときに使う。
argument-hint: <issue番号>
---

# implement

`local-grill-me` → `breakdown` → `implement` パイプラインの3段階目。1件のissueを実装し、PRを作成する。
マージはしない（マージはレビューする人間が行う）。

## 進め方

### 0. issueを読み込み、状態を確認する

`gh issue view <n> --json number,title,body,url,state,labels`

- すでにcloseされている場合は、ユーザーに伝えて止まる。
- issue本文自体に複数の `###` タスクグループが含まれている場合（つまり `/local-grill-me` の
  出力が `/breakdown` されないままの状態）、そのまま一気に実装するのではなく先に
  `/breakdown <n>` を実行するよう提案して止まる — それをやらないとパイプラインの意味がなくなる。

### 1. 作業ツリーを触る前に安全確認

`git status` を実行する。このissueと無関係なuncommittedな変更がある場合は、
`git stash push -u` で退避するか、ブランチを切る前にユーザーに確認する。

### 2. ブランチを作る

issueから名前を作る（例: `<n>-<kebab-title>`）でブランチを作成・切り替える。

### 3. 実装する

issue本文のチェックリストに沿って進める。まず周辺コードを読み、このリポジトリの既存の作法に
従う（`CLAUDE.md` を確認し、近くのファイルで既に使われているパターンを踏襲する — すでに
どこかで解決済みのことに新しいパターンを持ち込まない）。変更はissueに書かれた範囲に収める。
issueの想定より大きいと分かった場合は、黙ってスコープを広げず、ユーザーに伝えて確認する。

### 4. 検証する

完了とみなす前に、このリポジトリのチェックを実行する（変更内容に応じて必要な範囲だけでよい）。

```bash
pnpm lint
pnpm typecheck
pnpm test
```

（モノレポ全体の実行が遅い・無関係な場合は、turboのfilterで対象を絞る。例:
`turbo lint --filter=@project-bd-client/web`）

失敗があれば直す。redなビルドのまま渡さない。

### 5. commitする

このセッションで読み込み済みの、リポジトリ通常のcommit手順に従う（対象ファイルを個別に
stage、ヒアドキュメントでcommitメッセージ、Co-Authored-By trailerを付与）。このissueに
関係するものだけをcommitする。

### 6. PRを作成する

リポジトリ通常のPR作成手順に従う（`-u` 付きでpush、`gh pr create` にヒアドキュメントの本文で
`Closes #<n>` を含める、短いサマリー、ステップ4で実際に検証した内容を反映したテスト計画の
チェックリストを付ける）。

### 7. 報告する

PRのURLを伝える。マージはしない。頼まれない限りレビュワーの指定もしない。

## 注意

- 実装の途中で、issue本文が答えを持っていない設計判断にぶつかった場合、重要なものは黙って
  推測せず、`/local-grill-me` がするのと同じように確認する。
- このskillは、issueがすでにスコープ済み（明確でPR単位のチェックリストを持つ）であることを
  前提にしている。中身が空・薄いissueを渡された場合は、ここで計画を即興で作らず先に
  `/local-grill-me` → `/breakdown` を提案する。

---
name: breakdown
description: スコープ済みのGitHub issue（/local-grill-me で作られたようなフェーズ分けタスクチェックリストを持つissue）を、`gh issue create --parent` を使ってネイティブなGitHub sub-issueに分解する。計画issueを実装可能な単位に分解したいとき、または明示的に /breakdown を呼んだときに使う。
argument-hint: <issue番号>
---

# breakdown

`local-grill-me` → `breakdown` → `implement` パイプラインの2段階目。すでにスコープされたissueを受け取り、
各タスクグループを実際のGitHub sub-issueに変換する（GitHubネイティブのsub-issue関係を使うため、
親issue側にsub-issueの進捗バーがUI上に表示される）。

## 進め方

### 1. 取得してパースする

`gh issue view <n> --json number,title,body,url`

本文中の タスク/Tasks セクション配下にある `###` 見出しごとに、`- [ ]` チェックリストを
パースする（これは `/local-grill-me` が生成する形式）。本文がこの形になっていない場合:

- グループ分けされていないフラットなチェックリストしか無い場合は、自分で妥当な単位に
  グルーピングし直してユーザーに提示する（チェックボックス1個につきsub-issue1個、にはしない。
  sub-issueはタスク単位ではなくPR単位の粒度にする）。
- チェックリスト自体が無い場合は、このissueはまだスコープされていない旨を伝え、先に
  `/local-grill-me <n>` を実行するよう提案する（当てずっぽうで分解しない）。

### 2. 作成前にプレビューする

複数の新規issueを作るのは1件の編集より影響が大きいので、必ず作成前に分解案を提示し、明示的な
確認を取る。

```
以下の sub-issue を作成します:
1. <タイトル1> — <n件>
2. <タイトル2> — <n件>
...
```

各 `###` 見出しをそのままsub-issueのタイトルにする（見出し単体だと文脈が分からない場合のみ、
親のコンテキストを補う。例えば「PR1: 共有パッケージの抽出」はそのままでよい）。sub-issueの本文は
そのグループのチェックリストに加え、先頭に親への短いリンク行を入れる。

```markdown
Part of #<親issue番号>

- [ ] ...
- [ ] ...
```

### 3. 作成する

確認が取れたら、各グループについて実行する。

```bash
gh issue create --title "<タイトル>" --body "$(cat <<'EOF'
...
EOF
)" --parent <n>
```

`--parent` を使うと、手動でGraphQLを叩かなくてもネイティブなsub-issue関係が直接できる
（このリポジトリの `gh` CLIが対応済みであることを確認済み）。

### 4. 報告する

作成したsub-issueの番号とURLを一覧で示し、それぞれを独立して `implement <sub-issue番号>` に渡せる
旨を伝える。親issueの本文はいじらない — `--parent` で関係が作られれば、GitHub側が
sub-issue一覧と進捗を自動的に表示する。

## 注意

- すでに実質的に終わっている・些末なグループについては、sub-issueを作らずスキップするか
  ユーザーに確認する（ノイズを増やさない）。
- 親issueにすでにsub-issueが存在する場合（`gh issue view <n> --json subIssues` は
  対応していないことがあるので、不明なら `gh issue view <n> --web` でissueページを確認するか
  ユーザーに聞く）、重複して追加する前に確認する。

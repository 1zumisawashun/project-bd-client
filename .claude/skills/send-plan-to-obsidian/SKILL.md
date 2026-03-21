---
description: 実装タスクに取り組む前にplanモードで設計し、Obsidianに保存するワークフロー。非自明な実装タスク（新機能追加、複数ファイル変更、設計判断が必要な作業）を開始する際に自動的に起動する。
user-invocable: true
argument-hint: <feature-name> [description]
---

# Plan-Driven Development Workflow

あなたはplan駆動型の開発ワークフローを実行します。
コードを書く前に必ず設計し、設計を記録し、過去の設計を活用します。

planの保存先: `~/Documents/Obsidian Vault/Plan/`

## Step 1: 過去のplanを探索する

まず Obsidian Vault の既存planを検索してください。

```
Glob: ~/Documents/Obsidian Vault/Plan/**/*.md
```

- 関連するplanが見つかった場合、その内容を読んで文脈を把握する
- 過去のplanで決定された設計方針・技術選定・命名規則を尊重する
- 矛盾する場合はユーザーに確認する

## Step 2: planモードに入る

`EnterPlanMode` ツールを使用してplanモードに入ってください。

planモードでは以下を行います:

1. コードベースを探索し、既存のパターンとアーキテクチャを理解する
2. Obsidian内の関連planで決定済みの方針を踏まえる
3. 実装アプローチを設計する
4. ユーザーの承認を得る

### planの書き方ガイドライン

planには以下を含めてください:

- **背景**: なぜこの変更が必要か
- **方針**: 選択したアプローチとその理由
- **影響範囲**: 変更するファイル・コンポーネント一覧
- **実装ステップ**: 具体的な手順（チェックリスト形式）
- **考慮事項**: トレードオフ、リスク、代替案

## Step 3: planをObsidianに保存する

planモードが承認された後、**実装を始める前に**以下を行います:

1. planを `~/Documents/Obsidian Vault/Plan/` にMarkdownファイルとして保存する
   - ファイル名: `YYYY-MM-DD-<feature-name>.md`
   - パス例: `~/Documents/Obsidian Vault/Plan/2026-02-08-admin-coffee-profile-create.md`

2. planファイルは以下の構成にする:

   ```markdown
   # <Feature Name>

   - **日付**: YYYY-MM-DD
   - **ステータス**: approved
   - **プロジェクト**: <project-directory-name>
   - **関連ブランチ**: <current-branch-name>

   ## 背景

   ...

   ## 方針

   ...

   ## 影響範囲

   ...

   ## 実装ステップ

   - [ ] ステップ1
   - [ ] ステップ2
         ...

   ## 考慮事項

   ...
   ```

## Step 4: 実装に進む

planの保存が完了してから実装を開始してください。
実装中はplanの「実装ステップ」をチェックリストとして活用し、
完了したステップにチェックを入れて進捗を追跡してください。

## 引数

- `$ARGUMENTS`: 機能名や説明。省略された場合はユーザーに確認する。

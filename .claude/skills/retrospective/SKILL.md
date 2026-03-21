---
name: retrospective
description: 隔週1on1用の振り返りレポートを生成する。PR活動・Claude Code利用状況・課題/発見を統合し、Obsidianに保存する。
user-invocable: true
argument-hint: '[week-number e.g. 2026-W11]'
---

# Retrospective Report Generator

シニアエンジニアとの隔週1on1に向けて、直近2週間の活動データを収集・統合し、
振り返りレポートを生成するスキル。

## When to Use This Skill

- 隔週1on1の前にレポートを準備したいとき
- 「振り返り」「retro」「1on1の準備」と言われたとき
- スプリントの活動を定量的にまとめたいとき

## ワークフロー

### Step 1: 対象期間の決定

対象の週番号を決定する。

- 引数 `$ARGUMENTS` が指定されていればそれを使用（例: `2026-W11`）
- 指定がなければ現在の週番号を使用:

```bash
date +%Y-W%V
```

この `WEEK_ID` を以降のステップで使用する。

### Step 2: データ収集スクリプトの実行

既存の収集スクリプトを実行する。プロジェクトルートから相対パスで呼び出す。

```bash
PROJECT_ROOT=$(git rev-parse --show-toplevel)
bash "$PROJECT_ROOT/.claude/scripts/extract-prs.sh"
bash "$PROJECT_ROOT/.claude/scripts/extract-prompts.sh"
```

- スクリプトはそれぞれ Obsidian Vault にファイルを出力する
- 失敗した場合はエラーを報告し、取得できたデータで続行する

### Step 3: スクリプト出力の読み込み

以下のファイルを Read ツールで読み込む:

- `~/Documents/Obsidian Vault/PR Summary/{WEEK_ID}.md` — PR活動データ
- `~/Documents/Obsidian Vault/Claude Prompts/{WEEK_ID}.md` — 課題・発見データ

ファイルが存在しない場合は「データなし」として扱う。

### Step 4: セッションログの分析

Claude Code のセッションログから利用状況を集計する。

```bash
SINCE=$(date -v-14d +%Y-%m-%dT00:00:00 2>/dev/null || date -d '14 days ago' +%Y-%m-%dT00:00:00)

# セッション数・プロンプト数・ブランチ・プロジェクトを一括集計
find ~/.claude/projects -name "*.jsonl" -type f -print0 | xargs -0 jq -r \
  --arg since "$SINCE" '
  select(.type == "user") |
  select(.timestamp != null) |
  select(.timestamp >= $since) |
  [.sessionId, .cwd, .gitBranch] | @tsv
' 2>/dev/null | sort -u > /tmp/retro-sessions.tsv
```

このデータから以下を算出する:

| 指標                   | 算出方法                                              |
| ---------------------- | ----------------------------------------------------- |
| セッション数           | `cut -f1 /tmp/retro-sessions.tsv \| sort -u \| wc -l` |
| 総プロンプト数         | `wc -l < /tmp/retro-sessions.tsv`                     |
| アクティブプロジェクト | `cut -f2 /tmp/retro-sessions.tsv \| sort -u`          |
| 作業ブランチ           | `cut -f3 /tmp/retro-sessions.tsv \| sort -u`          |

### Step 5: 統合レポートの生成

Step 2〜4 で収集した全データを統合し、以下のテンプレートに沿ってレポートを作成する。
レポートは **チームの外のシニアエンジニアが読む前提** で、文脈を補足しながら書く。

出力先:

```bash
mkdir -p ~/Documents/Obsidian\ Vault/Retrospective
```

ファイルパス: `~/Documents/Obsidian Vault/Retrospective/{WEEK_ID}.md`

#### レポートテンプレート

```markdown
# 振り返りレポート — {WEEK_ID}

> 期間: {2週間前の日付} 〜 {今日の日付}
> 作成者: {GitHubユーザー名}
> 作成日: {今日の日付}

## サマリー

（PR活動・課題・発見を踏まえ、2-3文で今スプリントの活動を要約する。
　チーム外の人が読んでも文脈がわかるように書く。）

## PR活動

- **マージ済みPR数**: X
- **変更行数**: +YYY / -ZZZ
- **対象リポジトリ**: repo1, repo2

### PR一覧

（PR Summary の内容をリポジトリごとにグループ化して転記）

## Claude Code利用状況

| 指標                     | 値  |
| ------------------------ | --- |
| セッション数             | X   |
| 総プロンプト数           | Y   |
| アクティブプロジェクト数 | Z   |
| 作業ブランチ数           | W   |

### アクティブプロジェクト

- （プロジェクト名を列挙）

### 作業ブランチ

- （ブランチ名を列挙）

## 課題・発見

（Claude Prompts の内容を転記。困りごと、気づき、要望、方針変更。）

## 振り返り

### うまくいったこと

- （PR活動・利用状況から推測される成果）

### 難しかったこと

- （課題・発見セクションの困りごとから）

### 次のスプリントに向けて

- （課題・発見の要望や方針変更から導出）
```

#### レポート作成のガイドライン

- **サマリーは外部向け**: 日常の文脈を知らない人が読む前提で書く
- **定量データを先に**: 数値で活動の規模感を伝える
- **振り返りは客観的に**: データに基づいた分析を心がける
- **課題はそのまま**: 抽出された課題・発見は編集せずに含める

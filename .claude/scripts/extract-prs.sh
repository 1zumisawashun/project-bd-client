#!/bin/bash
# ~/.claude/scripts/extract-prs.sh
# 直近2週間の自分のPRを抽出し、Obsidianにサマリーを出力する
# 用途: 隔週1on1での活動共有

OBSIDIAN_BASE="$HOME/Documents/Obsidian Vault/PR Summary"
OUTPUT_FILE="$OBSIDIAN_BASE/$(date +%Y-W%V).md"
GH_USER=$(gh api user --jq '.login' 2>/dev/null)
SINCE=$(date -v-14d +%Y-%m-%d 2>/dev/null || date -d '14 days ago' +%Y-%m-%d)

mkdir -p "$OBSIDIAN_BASE"

# 全リポジトリから自分のmerged PRを取得（直近2週間）
PRS_JSON=$(gh search prs \
  --author "$GH_USER" \
  --merged \
  --merged-at ">=$SINCE" \
  --limit 100 \
  --json repository,title,url,closedAt \
  --jq 'sort_by(.closedAt) | reverse')

# 各PRの詳細を取得してマークダウンを生成
{
  echo "# PR Summary — $(date +%Y-W%V)"
  echo ""
  echo "> 期間: $SINCE 〜 $(date +%Y-%m-%d)"
  echo "> 作成者: $GH_USER"
  echo ""

  TOTAL=$(echo "$PRS_JSON" | jq 'length')
  TOTAL_ADD=0
  TOTAL_DEL=0

  # リポジトリごとにグループ化
  REPOS=$(echo "$PRS_JSON" | jq -r '.[].repository.nameWithOwner' | sort -u)

  for repo in $REPOS; do
    echo "## $repo"
    echo ""

    echo "$PRS_JSON" | jq -c --arg repo "$repo" '.[] | select(.repository.nameWithOwner == $repo)' | while read -r pr; do
      TITLE=$(echo "$pr" | jq -r '.title')
      URL=$(echo "$pr" | jq -r '.url')
      CLOSED=$(echo "$pr" | jq -r '.closedAt' | cut -c1-10)

      # PR番号を抽出して詳細取得
      PR_NUM=$(echo "$URL" | grep -oE '[0-9]+$')
      DETAIL=$(gh pr view "$PR_NUM" --repo "$repo" --json additions,deletions,changedFiles,labels 2>/dev/null)

      ADD=$(echo "$DETAIL" | jq -r '.additions // 0')
      DEL=$(echo "$DETAIL" | jq -r '.deletions // 0')
      FILES=$(echo "$DETAIL" | jq -r '.changedFiles // 0')
      LABELS=$(echo "$DETAIL" | jq -r '(.labels // []) | map(.name) | join(", ")')

      echo "- **[$TITLE]($URL)**"
      echo "  - merged: $CLOSED | +$ADD -$DEL | $FILES files"
      if [ -n "$LABELS" ] && [ "$LABELS" != "" ]; then
        echo "  - labels: $LABELS"
      fi
    done
    echo ""
  done

  echo "---"
  echo ""
  echo "**合計: ${TOTAL} PRs**"
} > "$OUTPUT_FILE"

echo "Saved to: $OUTPUT_FILE"
echo "Total PRs: $(echo "$PRS_JSON" | jq 'length')"

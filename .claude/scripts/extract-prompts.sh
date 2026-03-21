#!/bin/bash
# ~/.claude/scripts/extract-prompts.sh
# see https://zenn.dev/kki2ne/articles/claude-code-advanced-tips-2026

OBSIDIAN_BASE="$HOME/Documents/Obsidian Vault/Claude Prompts"

# JSONL からユーザープロンプトを抽出
find ~/.claude/projects -name "*.jsonl" -type f | while read logfile; do
  jq -r '
    select(.type == "user") |
    select(.message.content | type == "string") |
    select(.message.content | length > 15) |
    .message.content | gsub("\n"; " ") | .[0:300]
  ' "$logfile"
done | sort -u > /tmp/prompts.txt

# AI で課題・発見を抽出
cat /tmp/prompts.txt | claude --print --model sonnet \
  "課題や発見（困りごと、感情、要望、試行錯誤）を抽出して。
   単なる指示は除外。" > "$OBSIDIAN_BASE/$(date +%Y-W%V).md"
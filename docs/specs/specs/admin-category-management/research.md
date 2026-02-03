# Research & Design Decisions

---

**Purpose**: 管理者カテゴリー管理機能の技術設計を裏付ける調査結果と設計判断を記録する。

---

## Summary

- **Feature**: `admin-category-management`
- **Discovery Scope**: Simple Addition (CRUD/UI)
- **Key Findings**:
  - Next.js App Router + Server Actions パターンを採用済み
  - Drizzle ORM + SQLite でカテゴリーテーブルが既に存在
  - NextAuth v5 でユーザーロール（ADMIN/USER）が実装済み

## Research Log

### 既存のカテゴリースキーマ

- **Context**: カテゴリー管理機能に必要なデータ構造の確認
- **Sources Consulted**: `app/functions/libs/drizzle/schema.ts`
- **Findings**:
  - `categories` テーブルが既に定義済み（id, name, created_at, updated_at）
  - `articlesCategories` で多対多リレーションが実装済み
  - UUIDを主キーとして使用
- **Implications**: 既存スキーマを活用可能、追加マイグレーション不要

### 認証・認可パターン

- **Context**: 管理者のみがアクセス可能にするための認可方式
- **Sources Consulted**: `app/functions/libs/next-auth/auth.ts`, `auth.config.ts`
- **Findings**:
  - `userRoles` に `USER` と `ADMIN` が定義済み
  - JWT戦略でセッション管理
  - `getSession()` でサーバーサイドからセッション取得可能
- **Implications**: 既存のロールベースアクセス制御を活用

### Server Actions パターン

- **Context**: データ操作のAPI設計方針
- **Sources Consulted**: `app/pages/authentication/sign-up/signUp.action.ts`
- **Findings**:
  - `'use server'` ディレクティブで Server Actions を使用
  - `ActionsResult<T>` 型で統一されたレスポンス形式
  - Zod スキーマによるバリデーション
- **Implications**: 同パターンでカテゴリー作成アクションを実装

### UIコンポーネントパターン

- **Context**: フォームUI実装の方針
- **Sources Consulted**: `app/components/forms/`, `app/components/elements/`
- **Findings**:
  - @base-ui/react をベースとしたカスタムコンポーネント
  - CSS Modules でスタイリング
  - react-hook-form + zod でフォーム管理
- **Implications**: 既存のフォームコンポーネントを再利用

## Architecture Pattern Evaluation

| Option         | Description                   | Strengths                  | Risks / Limitations  | Notes  |
| -------------- | ----------------------------- | -------------------------- | -------------------- | ------ |
| Server Actions | Next.js Server Actions でCRUD | 既存パターンと一致、型安全 | なし                 | 採用   |
| API Routes     | 従来のREST API                | RESTful設計                | 既存パターンと不一致 | 不採用 |

## Design Decisions

### Decision: Server Actions を使用したカテゴリー作成

- **Context**: カテゴリー作成のサーバーサイド処理方式
- **Alternatives Considered**:
  1. Server Actions — Next.js標準機能
  2. API Routes — 従来のREST API
- **Selected Approach**: Server Actions
- **Rationale**: 既存のサインアップ機能と同じパターンを踏襲、型安全性が高い
- **Trade-offs**: REST APIほどの疎結合ではないが、このプロジェクトでは一貫性を優先
- **Follow-up**: なし

### Decision: 既存スキーマの活用

- **Context**: データベーススキーマ設計
- **Alternatives Considered**:
  1. 既存の categories テーブルを使用
  2. 新規テーブルを作成
- **Selected Approach**: 既存テーブルを使用
- **Rationale**: categories テーブルが既に存在し、必要な属性（id, name, created_at, updated_at）を持つ
- **Trade-offs**: なし
- **Follow-up**: なし

## Risks & Mitigations

- カテゴリー名の重複 — データベースレベルで一意制約を追加（または Server Action でチェック）
- 認可バイパス — ページレベルとアクションレベルの両方で管理者チェックを実施

## References

- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) — Server Actions 公式ドキュメント
- [Drizzle ORM](https://orm.drizzle.team/docs/overview) — Drizzle ORM 公式ドキュメント
- [NextAuth.js v5](https://authjs.dev/getting-started) — NextAuth v5 公式ドキュメント

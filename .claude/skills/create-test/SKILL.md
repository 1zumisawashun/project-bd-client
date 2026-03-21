---
name: create-test
description: コンポーネントやモジュールのテストファイルを作成する。BDD・AAAパターンに従い、プロジェクトの規約に沿ったテストを生成する。
---

# Test Rules

本ドキュメントのキーワードはRFC2119に従って解釈されるものとします。

## MUST（必須）

- AAAパターン（Arrange / Act / Assert）で記述する
- コンポーネントのセットアップはArrangeに分類する
- テストタイトルは `{状態}場合、{結果}こと` の形式で書く
- roleベースのクエリ（`getByRole` / `findByRole` / `queryByRole`）を優先する
- 1テスト = 1論理的概念・1シナリオに限定する
- 全Propsをカバーするテストケースを作成する
- Acceptance Criteriaの項目をテストする

## MUST NOT（禁止）

- VRTで担保している表示系テストをreact-testing-libraryで重複してテストする
- `composeStories` やStorybook story objectをテストに使用する
- アニメーション・トランジションのテストを行う
- テストコード内に `if` / `for` などの制御構文を使用する

## SHOULD（推奨）

- カスタムrender関数（`@/functions/libs/react-testing-library/test-utils`）を使用する
- DAMP原則に沿って記述する（DRYより可読性を優先）
- 共通化が必要な場合は `beforeEach` ではなく関数を使用する

## SHOULD NOT（非推奨）

- `beforeEach` を使用する
- 性急な抽象化を行う（AHA原則）

## MAY（任意）

- ユーザー操作がない場合、`render(<Component />)` のみを使用する
- roleで取得できない場合に限り `getByTestId` などの代替クエリを使用する

---

## 実装例

### ユーザー操作あり

```typescript
describe('ContactModal', () => {
it('変更なしでキャンセルボタンを押下した場合、モーダルが閉じること', async () => {
// Arrange
const onClose = jest.fn();
const { user } = render(<ContactModal isOpen={true} onClose={onClose} />);

    // Act
    await user.click(screen.getByRole('button', { name: 'キャンセル' }));

    // Assert
    expect(onClose).toHaveBeenCalled();

});
});
```

### ユーザー操作なし（静的な表示テスト）

```typescript
describe('AnchorButton', () => {
it('disabled=trueの場合、リンクが無効化されること', () => {
// Arrange
render(<AnchorButton href="/test" disabled={true}>無効なボタン</AnchorButton>);

    // Assert
    expect(
      screen.getByRole('button', { name: '無効なボタン' })
    ).toHaveAttribute('aria-disabled', 'true');

});
});
```

---
applyTo: '*.test.*'
---

# Test Instruction: テスト作成のためのインストラクション

## Why - なぜテストするのか

- **リファクタリングの安全性を確保する**
  - コードの変更時にデグレードを防ぎ、安心してリファクタリングできる環境を提供
- **実装品質を担保する**
  - 複雑なロジックや不安のある実装において、期待する動作を保証
- **仕様の明文化**
  - テストコード自体がドキュメントとして機能し、システムの仕様・振る舞いを表現

## What - 何をテストするのか

### テスト戦略

- **[Testing Trophy（テスティングトロフィー）](https://testingjavascript.com/)**に基づく設計
  - コストパフォーマンスを重視した効率的なテスト配置でプロジェクト全体の品質を担保
  - 下層ほど価値が高く堅牢な順で「ユニットテスト」→「統合テスト」→「E2Eテスト」を適切なバランスで配置
  - UI層やAPIモックも組み合わせ全体品質・仕様担保を意識

### 原理・原則

- **BDD（Behavior Driven Development）**
  - ビジネス価値と振る舞いに焦点を当てたテスト設計により、ステークホルダー間の共通理解を促進
  - 実装に依存しないので、内部実装が変わってもテストが壊れにくい
  - ユーザー操作をそのままのシナリオで記述するので読みやすく意図が伝わる
  - 振る舞いに焦点を当てることで意図が明確で長期的に保守しやすいテストを実現することができる
  - 詳細はテストしない - ユーザーから見えない内部実装ではなく、アプリケーションの振る舞いに注目してテストを書く

## How - どのようにテストするのか

### テスト手法

- **[AAAパターン（Arrange, Act, Assert）](https://wiki.c2.com/?ArrangeActAssert)の徹底**
  - テストの可読性と保守性を向上させ、仕様書としての価値を最大化
  - BDD（振る舞い駆動開発）の一部として、テストを構造的に表現する手法
  - Arrange（準備）→Act（操作）→Assert（検証）を明確に分離

```typescript
// AAAパターンの具体例
describe('ContactModal', () => {
  it('変更なしでキャンセルボタンを押下した場合、モーダルが閉じること', async () => {
    // Arrange（準備）：テストに必要なモックやコンポーネントをセットアップ
    const onClose = jest.fn();
    const { user } = setup(<ContactModal isOpen={true} onClose={onClose} />);

    // Act（操作）：テスト対象の動作を実行
    await user.click(screen.getByRole('button', { name: 'キャンセル' }));

    // Assert（検証）：期待する結果を確認
    expect(onClose).toHaveBeenCalled();
  });

  it('保存に成功した場合、成功メッセージが表示されモーダルが閉じること', async () => {
    // Arrange（準備）：サーバーモックの設定とコンポーネントのセットアップ
    server.use(...ContactModalMocks.Success);
    const onClose = jest.fn();
    const { user } = setup(<ContactModal isOpen={true} onClose={onClose} />);

    // Act（操作）：フォーム入力と保存ボタンのクリック
    await user.type(screen.getByRole('textbox', { name: /名前/ }), '田中太郎');
    await user.click(screen.getByRole('button', { name: '保存' }));

    // Assert（検証）：成功メッセージとモーダルの閉じることを確認
    expect(await screen.findByRole('status')).toHaveTextContent('保存しました');
    expect(onClose).toHaveBeenCalled();
  });
});
```

### 実装・ファイル構成方針

- **Jest・React Testing Library・MSW**を利用してテストコードを実装
- コロケーション方針
  - 実装ファイル（例：`Foo.tsx`）と同じディレクトリに、同名＋`.test.tsx`でテストを配置

### コーディングルール

- **コンポーネントのPropsはテストする** - Propsによる表示・振る舞いの変化を確実に検証し、コンポーネントの仕様を明確化

- **Acceptance Criteriaの項目をテストする** - 機能の受け入れ基準を満たすことを確認し、ビジネス要件の実現を保証

- **`{状態}場合、{結果}こと`（振る舞い）でテストケースのタイトルを書く** - テストの意図と期待値を明確に表現し、仕様書としての価値を高める
  - 「ボタンが無効な場合、クリックできないこと」
  - 「データが空の場合、エラーメッセージが表示されること」
  - 「正常な入力がある場合、送信が成功すること」

- **DAMP原則に沿ったテストを書く** - 失敗時の原因特定と意図の理解を容易にし、効率的なデバッグを実現
  - DRYを追求するあまりロジックを共通化しすぎると、個々のテストケースがどのようなデータ（Given）で何（When）をテストし、何を期待しているのか（Then）が一見して分からなくなる
  - プロダクションコードの保守性は「仕様変更への対応しやすさ」だが、テストコードの保守性は「テストが失敗したときの原因の特定しやすさ」と「テストの意図の理解しやすさ」である

- **AHA原則（Avoid Hasty Abstractions）** - 性急な抽象化を避け、再利用性が明確になってから共通化することで適切なテスト設計を実現
  - 注意深く抽象化を適用したテストはメンテナンスの手間が少なく済む
  - シンプルなコンポーネントの場合は抽象化を排除してインライン化するのが最善
  - 重複するコードが気になり出して初めてコードを共有する方法をとる
  - 共有する場合はbeforeEachではなく関数を使った方法を採用する

- **VRTで担保している表示系のテストは不要**
  - VRTで担保している表示系のテストはreact-testing-libraryでテストしない
  - ビジュアルレグレッションテスト（VRT）で既に担保されているUI表示については重複テストを避ける

- **Storybook composeStoriesの利用禁止**
  - テストにcomposeStoriesやStorybook story objectを利用しない
  - テスト対象コンポーネントを直接importしてテストを記述する

- **アニメーションのテストは不要**
  - アニメーション等のビジュアルエフェクト・トランジションのテストは行わない

- **テストコード上のロジックを避ける**
  - テストコード上では、ifやforのような制御構文や複雑な関数制御といった、独自のロジック制御はできるだけ控える
  - テストは「1テスト=1論理的概念・1シナリオ」にし、仕様書としての明快さ・可読性を最重視
  - 参考: [Google Testing Blog](https://testing.googleblog.com/2015/04/testing-on-toilet-change-detector-tests.html), [Vitest: no-conditional-in-test](https://vitest.dev/guide/eslint.html#no-conditional-in-test), [seto3記事](https://zenn.dev/seto3/articles/jest-writing-antipatterns#%E6%96%B9%E9%87%9D2%EF%BC%9A%E6%B3%A8%E6%84%8F%E3%81%99%E3%81%B9%E3%81%8D%E3%81%A6%E3%81%AA%E3%81%84if%E3%81%AE%E4%BD%BF%E7%94%A8)

- **beforeEachはできるだけ使用を避ける**
  - テスト単体での移植性を重視し（テスト単体をコピペしてもなるべくそのまま動かせる）、保守性を向上
  - beforeEachでやってしまうとあるテストに関係のないmock化やmockのresetが入り込んでしまう可能性がある
  - Vitestのコンテキストでは、beforeEachで定義していた処理をtest.extendを使ってcontext経由で渡すとそのコンテキストにアクセスしない限り実行されない無駄のない作りになる

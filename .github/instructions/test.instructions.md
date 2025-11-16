---
applyTo: '*.test.*'
---

# Project coding standards for TypeScript and React

他で定義されているルールに加えて、以下のガイドラインに従ってください。

## TypeScript Guidelines

– すべての新規コードにTypeScriptを使用します。
– 可能な限り、関数型プログラミングの原則に従います。
– データ構造と型定義にはインターフェースを使用します。
– イミュータブル（不変）なデータ（const、readonly）を優先します。
– オプショナルチェーン（?.）およびNull合体（??）演算子を使用します。

## React Guidelines

– Hooksを使用した関数コンポーネントを使用します。
– React Hooksのルール（条件分岐内で呼び出さないなど）に従います。
– 子要素（children）を持つコンポーネントにはReact.FC型を使用します。
– コンポーネントは小さく、責務を単一に保ちます。
– コンポーネントのスタイリングにはCSS Modulesを使用します。

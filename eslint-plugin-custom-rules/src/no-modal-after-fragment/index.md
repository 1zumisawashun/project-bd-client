# xuan frontend　カスタムESLintルール

## 各ルールの概要

### no-modal-after-fragment

kaipoke-uiのModalコンポーネントを書く際にFragment内に直接入れる書き方を禁止するルールになります。Modal内で開く別のModalを並列して書いてしまうと、スクロールの挙動にわかりにくいバグが発生するためこのようなルールとしています。
直接的なルールではないため、もし以下のパターン以外でルールに違反する書き方が必要になった場合はoffにしてください。

#### OK

```jsx
const SomeModal = () => {
  return (
    <Modal>
      <ModalBody>
        <div>hoge</div>
      </ModalBody>
      <SubModal />
    </Modal>
  )
}
```

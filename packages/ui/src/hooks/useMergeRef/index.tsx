import { useMemo, ForwardedRef } from 'react'

/**
 * 骨子として以下の記事を参考にしている
 * @see https://zenn.dev/remon/articles/28af13312d55e5
 * @see https://stackoverflow.com/questions/62238716/using-ref-current-in-react-forwardref
 */

function assignRef<T = HTMLElement>(ref: ForwardedRef<T>, node: T) {
  if (!node) return
  // NOTE: 親コンポーネントからのrefがある場合は、それも適用する
  if (typeof ref === 'function') {
    ref(node)
  } else if (ref) {
    ref.current = node
  }
}

export function useMergeRef<T>(...refs: ForwardedRef<T>[]) {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null
    }
    return (node: T) => {
      refs.forEach((ref) => {
        if (ref) assignRef(ref, node)
      })
    }
  }, [refs])
}

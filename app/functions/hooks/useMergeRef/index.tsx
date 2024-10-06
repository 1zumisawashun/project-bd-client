import { useMemo, MutableRefObject, ForwardedRef } from 'react'

/**
 * 骨子として以下の記事を参考にしている
 * @see https://zenn.dev/remon/articles/28af13312d55e5
 */

export function assignRef<T = HTMLDivElement>(
  ref: MutableRefObject<T> | ((instance: T) => void) | null | undefined,
  node: T,
) {
  if (!node) return
  // NOTE: 親コンポーネントからのrefがある場合は、それも適用する
  if (typeof ref === 'function') {
    ref(node)
  } else if (ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = node
  }
}

export function useMergeRef<T>(
  ...refs: (MutableRefObject<T> | ForwardedRef<T> | null | undefined)[]
) {
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

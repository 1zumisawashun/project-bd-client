import { useRef, useState, useEffect } from 'react'

/**
 * 以下でリファクタできない？
 * @see https://www.notion.so/React-useContext-useSyncExternalStore-e2fccfe78f08469fa05a954ed4e9b4b6
 */
export const useLineClamp = (num: number) => {
  const referenceRef = useRef<null | HTMLDivElement>(null)
  const [isClamped, setIsClamped] = useState(false)

  useEffect(() => {
    const container = referenceRef.current

    // ResizeObserverのインスタンスを作成
    const resizeObserver = new ResizeObserver(() => {
      if (!container) {
        return
      }

      // テキストのクランプ状態をチェック
      if (container.scrollHeight > container.clientHeight) {
        setIsClamped(true)
      } else {
        setIsClamped(false)
      }
    })

    // ResizeObserverをcontainerに適用
    if (container) {
      resizeObserver.observe(container)
    }

    // クリーンアップ: ResizeObserverの監視を解除
    return () => {
      if (container) {
        resizeObserver.unobserve(container)
      }
    }
  }, [])

  const styles = {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: `${num}`,
    WebkitBoxOrient: 'vertical',
  }

  return { referenceRef, isClamped, styles }
}

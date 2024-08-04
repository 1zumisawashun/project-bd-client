import { useCallback, useState } from 'react'
import { isNumber, isString } from '../../helpers/typeGuard'

export const useArrayState = <T>(initial: T[] = []) => {
  const [state, setState] = useState<T[]>(initial)

  const add = useCallback((value: T | T[]) => {
    const isArray = Array.isArray(value)

    if (isArray) {
      setState((prev) => [...prev, ...value]) // array case
    } else {
      setState((prev) => [...prev, value]) // objects/primitive case
    }
  }, [])

  const remove = useCallback((value: number | T) => {
    if (isNumber(value)) {
      setState((prev) => {
        const newState = [...prev]
        newState.splice(value, 1)
        return newState
      })
      return
    }
    if (isString(value)) {
      setState((prev) => prev.filter((item) => item !== value))
      return
    }
    throw new Error('we only allow primitives.')
  }, [])

  const update = useCallback((value: T | T[], index?: number) => {
    const isArray = Array.isArray(value)

    if (isArray) {
      setState(value) // array case
    } else {
      if (!index) throw new Error('index is required.')

      setState(
        (prev) =>
          prev.map((obj, _index) => {
            return _index === index ? value : obj
          }), // objects/primitive case
      )
    }
  }, [])

  /**
   * 配列の要素を移動させる
   */
  const move = (currentIndex: number, targetIndex: number) => {
    const targetItem = state[currentIndex]!
    // currentIdの位置にあるstateをnullにしたarrayを作る
    const array = state.map((target, i) => (i === currentIndex ? null : target))
    // targetIndexにtargetItemを挿入する
    array.splice(targetIndex, 0, targetItem)
    // nullを取り除く（array.map + array.filterの複合技、ユーザ定義型ガードが必要ない）
    const newItems = array.flatMap((target) =>
      target !== null ? [target] : [],
    )
    update(newItems)
  }

  return [state, { add, remove, update, move }] as const
}

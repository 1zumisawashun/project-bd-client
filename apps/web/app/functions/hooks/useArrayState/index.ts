import { useCallback, useState } from 'react'
import { isNumber, isString } from '../../helpers/typeGuard'

export const useArrayState = <T>(initial: T[] = []) => {
  const [state, setState] = useState<T[]>(initial)

  const add = useCallback(
    (value: T | T[]) => {
      const isArray = Array.isArray(value)

      if (isArray) {
        const newState = [...state, ...value]
        setState(newState)
        return newState
      }
      const newState = [...state, value]
      setState(newState)
      return newState
    },
    [state],
  )

  const remove = useCallback(
    (value: number | T) => {
      const newState = [...state]

      if (isNumber(value)) {
        newState.splice(value, 1)
        setState(newState)
        return newState
      }
      if (isString(value)) {
        const newValue = newState.filter((d) => d !== value)
        setState(newValue)
        return newValue
      }
      throw new Error('we only allow primitives.')
    },
    [state],
  )

  const update = useCallback(
    (value: T | T[], index?: number) => {
      const isArray = Array.isArray(value)

      if (isArray) {
        setState(value)
        return value
      }
      if (!index) {
        throw new Error('index is required.')
      }

      const newState = [...state].map((d, i) => (i === index ? value : d))
      setState(newState)
      return newState
    },
    [state],
  )

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

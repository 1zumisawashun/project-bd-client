import { act, renderHook } from '@testing-library/react'
import { useArrayState } from './index'

const fruits = ['apple', 'banana', 'orange']

describe('useArrayState', () => {
  test('初期値がfruitsに設定されている', () => {
    // arrange
    const initial = fruits
    const { result } = renderHook(() => useArrayState<string>(initial))
    const [state, _] = result.current
    // assert
    expect(state.length).toBe(3)
  })

  test('addを実行するとfruitsにgrapeが追加される', () => {
    // arrange
    const initial = fruits
    const { result } = renderHook(() => useArrayState<string>(initial))
    // NOTE:ここでresultを展開するとadd, removeが更新されなくなる

    // act
    act(() => result.current[1].add('grape'))
    // assert
    expect(result.current[0].length).toBe(4)
  })

  test('removeを実行するとfruitsからappleが削除される', () => {
    // arrange
    const initial = fruits
    const { result } = renderHook(() => useArrayState<string>(initial))
    // act
    act(() => result.current[1].remove(1))
    // assert
    expect(result.current[0].length).toBe(2)
  })
})

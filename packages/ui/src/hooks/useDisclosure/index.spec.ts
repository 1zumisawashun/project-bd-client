import { act, renderHook } from '@testing-library/react'
import { useDisclosure } from './index'

describe('useDisclosureの単体テスト', () => {
  test('初期値がtrueに設定されている', () => {
    // arrange
    const initial = true
    const { result } = renderHook(() => useDisclosure(initial))
    // assert
    expect(result.current.isOpen).toBe(true)
  })

  test('openを実行するとtrueになる', () => {
    // arrange
    const { result } = renderHook(() => useDisclosure())
    // act
    act(() => result.current.open())
    // assert
    expect(result.current.isOpen).toBe(true)
  })

  test('closeを実行するとfalseになる', () => {
    // arrange
    const { result } = renderHook(() => useDisclosure())
    // act
    act(() => result.current.close())
    // assert
    expect(result.current.isOpen).toBe(false)
  })

  test('toggleを実行するとtrueになる', () => {
    // arrange
    const { result } = renderHook(() => useDisclosure())
    // act
    act(() => result.current.toggle())
    // assert
    expect(result.current.isOpen).toBe(true)
  })
})

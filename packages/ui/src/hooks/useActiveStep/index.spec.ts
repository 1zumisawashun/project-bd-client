import { act, renderHook } from '@testing-library/react'
import { useActiveStep } from './index'

describe('useActiveStep', () => {
  test('初期値が10に設定されている', () => {
    // arrange
    const initial = 10
    const { result } = renderHook(() => useActiveStep(initial))
    // assert
    expect(result.current.step).toBe(10)
  })

  test('nextを実行するとstepが増える', () => {
    // arrange
    const { result } = renderHook(() => useActiveStep(10))
    // act
    act(() => result.current.next())
    // assert
    expect(result.current.step).toBe(11)
  })

  test('backを実行するとstepが減る', () => {
    // arrange
    const { result } = renderHook(() => useActiveStep(10))
    // act
    act(() => result.current.back())
    // assert
    expect(result.current.step).toBe(9)
  })

  test('resetを実行するとstepが0になる', () => {
    // arrange
    const { result } = renderHook(() => useActiveStep(10))
    // act
    act(() => result.current.reset())
    // assert
    expect(result.current.step).toBe(0)
  })
})

/**
 * NOTE:
 * 循環参照になるためtypes.tsに分離している
 */
export type CustomProps = {
  value: number
  onChange: (value?: number) => void
  onBlur: () => void
}

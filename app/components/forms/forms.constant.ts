export const groupItems = [
  { value: 'group item 1', label: 'group item 1' },
  { value: 'group item 2', label: 'group item 2' },
  { value: 'group item 3', label: 'group item 3' },
] as const

export const statusItems = [
  {
    value: 'unchecked ideal state',
    label: 'unchecked ideal state',
    checked: false,
    error: false,
  },
  {
    value: 'checked ideal state',
    label: 'checked ideal state',
    checked: true,
    error: false,
  },
  {
    value: 'unchecked error state',
    label: 'unchecked error state',
    checked: false,
    error: true,
  },
  {
    value: 'checked error state',
    label: 'checked error state',
    checked: true,
    error: true,
  },
] as const

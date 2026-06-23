import { Autocomplete as RowAutocomplete } from '@base-ui/react/autocomplete'
import { ComponentProps, FC } from 'react'

type AutocompleteProps = ComponentProps<typeof RowAutocomplete.Root>

type CustomProps = {}

type Props = AutocompleteProps & CustomProps

export const Autocomplete: FC<Props> = (props) => {
  return <RowAutocomplete.Root {...props} />
}

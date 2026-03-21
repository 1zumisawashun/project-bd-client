import { Autocomplete as RowAutocomplete } from '@base-ui/react/autocomplete'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'

type AutocompleteInputProps = ComponentProps<typeof RowAutocomplete.Input>

type CustomProps = {}

type Props = AutocompleteInputProps & CustomProps

type Ref = ElementRef<'input'>

export const AutocompleteInput = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowAutocomplete.Input
        {...props}
        // native props
        className={clsx('ui-input', className)}
        ref={ref}
      />
    )
  },
)

AutocompleteInput.displayName = 'AutocompleteInput'

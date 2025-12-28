import { ComponentProps, ElementRef, forwardRef } from 'react'
import { TextInput } from '../../../forms/TextInput'

type Ref = ElementRef<'input'>
type Props = { options: string[] } & ComponentProps<typeof TextInput>

/**
 * datalistで表現することができる
 * @see https://developer.mozilla.org/ja/docs/Web/HTML/Element/datalist
 */
export const AutocompleteInput = forwardRef<Ref, Props>((props, ref) => {
  return (
    <div>
      <TextInput
        type="text"
        autoComplete="off"
        {...props}
        ref={ref}
        list={props.name}
      />

      <datalist id={props.name}>
        {props.options.map((d, index) => (
          <option key={index}>{d}</option>
        ))}
      </datalist>
    </div>
  )
})

AutocompleteInput.displayName = 'AutocompleteInput'

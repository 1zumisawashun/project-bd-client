import { Input } from '@base-ui/react/input'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'

type InputProps = ComponentProps<typeof Input>

type CustomProps = {}

type Props = InputProps & CustomProps

type Ref = ElementRef<'input'>

/**
 * NOTE:
 * @see https://tech.smarthr.jp/entry/2024/03/12/170000
 */
export const TextInput = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        {...props}
        // native props
        className={clsx('ui-input', className)}
        ref={ref}
      />
    )
  },
)

TextInput.displayName = 'TextInput'

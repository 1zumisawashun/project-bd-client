import { Input } from '@base-ui/react/input'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from './index.module.css'

const BLOCK_NAME = 'text-input'

type InputProps = ComponentProps<typeof Input>

type CustomProps = {}

type Props = InputProps & CustomProps

type Ref = ElementRef<'input'>

/** @see https://tech.smarthr.jp/entry/2024/03/12/170000 */
export const TextInput = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        {...props}
        // native props
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        ref={ref}
      />
    )
  },
)

TextInput.displayName = 'TextInput'

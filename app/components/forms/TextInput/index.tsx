import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as Form from '@radix-ui/react-form'
import styles from './index.module.scss'

/** @see https://tech.smarthr.jp/entry/2024/03/12/170000 */
type Props = Omit<ComponentPropsWithoutRef<'input'>, 'placeholder'>
type Ref = ElementRef<'input'>

const BLOCK_NAME = 'text-input'
export const TextInput = forwardRef<Ref, Props>(
  ({ className, disabled, width, ...props }, ref) => {
    return (
      <Form.Control asChild>
        <input
          {...props}
          className={styles[`${BLOCK_NAME}`]}
          ref={ref}
          disabled={disabled}
        />
      </Form.Control>
    )
  },
)

TextInput.displayName = 'TextInput'

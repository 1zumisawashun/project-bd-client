import * as RowCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { ElementRef, forwardRef, useId } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'checkbox'
type Props = { error?: boolean } & RowCheckbox.CheckboxProps
type Ref = ElementRef<'button'>
export const Checkbox = forwardRef<Ref, Props>(
  ({ className, children, error, ...props }, ref) => {
    const id = useId()
    return (
      <label htmlFor={id} className={styles[`${BLOCK_NAME}-label`]}>
        <RowCheckbox.Root
          className={clsx(styles[`${BLOCK_NAME}`], className)}
          id={id}
          ref={ref}
          data-error={error}
          {...props}
        >
          {/* NOTE: uncheckedの場合、IndicatorはDOMから削除される */}
          <RowCheckbox.Indicator asChild>
            <CheckIcon />
          </RowCheckbox.Indicator>
        </RowCheckbox.Root>
        <span className={styles[`${BLOCK_NAME}-text`]}>{children}</span>
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'

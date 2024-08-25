/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from 'clsx'
import { forwardRef, ElementRef, useId } from 'react'
import * as RowCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import styles from '../index.module.scss'

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

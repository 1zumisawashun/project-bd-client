import clsx from 'clsx'
import { forwardRef, ElementRef, useId } from 'react'
import * as RowRadioGroup from '@radix-ui/react-radio-group'
import { CheckIcon } from '@radix-ui/react-icons'
import styles from '../index.module.scss'

const BLOCK_NAME = 'radio-group'
type Props = { error?: boolean } & RowRadioGroup.RadioGroupItemProps
type Ref = ElementRef<'button'>
export const RadioGroupItem = forwardRef<Ref, Props>(
  ({ className, children, error, ...props }, ref) => {
    const id = useId()
    return (
      <label htmlFor={id} className={styles[`${BLOCK_NAME}-item-label`]}>
        <RowRadioGroup.Item
          className={clsx(styles[`${BLOCK_NAME}-item`], className)}
          id={id}
          ref={ref}
          data-error={error}
          {...props}
        >
          {/* NOTE: uncheckedの場合、IndicatorはDOMから削除される */}
          <RowRadioGroup.Indicator asChild>
            <CheckIcon />
          </RowRadioGroup.Indicator>
        </RowRadioGroup.Item>
        <span className={styles[`${BLOCK_NAME}-item-text`]}>{children}</span>
      </label>
    )
  },
)

RadioGroupItem.displayName = 'RadioGroupItem'

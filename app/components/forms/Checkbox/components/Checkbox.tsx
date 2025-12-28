import { Checkbox as RowCheckbox } from '@base-ui/react/checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'checkbox'

type CheckboxRootProps = ComponentProps<typeof RowCheckbox.Root>

type CustomProps = { error?: boolean }

type Props = CheckboxRootProps & CustomProps

type Ref = HTMLElement

export const Checkbox = forwardRef<Ref, Props>(
  ({ className, children, error, ...props }, ref) => {
    return (
      <label className={styles[`${BLOCK_NAME}-label`]}>
        <RowCheckbox.Root
          {...props}
          // native props
          className={clsx(styles[`${BLOCK_NAME}`], className)}
          ref={ref}
          // custom props
          data-error={error}
        >
          <RowCheckbox.Indicator>
            <CheckIcon />
          </RowCheckbox.Indicator>
        </RowCheckbox.Root>
        <span className={styles[`${BLOCK_NAME}-text`]}>{children}</span>
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'

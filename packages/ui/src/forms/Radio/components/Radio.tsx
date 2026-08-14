import { Radio as RowRadio } from '@base-ui/react/radio'
import { CheckIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'radio'

type RadioProps = ComponentProps<typeof RowRadio.Root>

type CustomProps = { error?: boolean }

type Props = RadioProps & CustomProps

type Ref = HTMLElement

export const Radio = forwardRef<Ref, Props>(
  ({ className, children, error, ...props }, ref) => {
    return (
      <label className={clsx('ui-option-label')}>
        <RowRadio.Root
          {...props}
          // native props
          className={clsx('ui-option', styles[`${BLOCK_NAME}`], className)}
          ref={ref}
          // custom props
          data-error={error}
        >
          <RowRadio.Indicator>
            <CheckIcon />
          </RowRadio.Indicator>
        </RowRadio.Root>
        <span className={clsx('ui-option-text')}>{children}</span>
      </label>
    )
  },
)

Radio.displayName = 'Radio'

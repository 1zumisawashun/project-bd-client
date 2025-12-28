import { Fieldset as RowFieldset } from '@base-ui/react/fieldset'
import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'fieldset'

type RowFieldsetProps = ComponentProps<typeof RowFieldset.Root>

type CustomProps = {}

type Props = RowFieldsetProps & CustomProps

type Ref = HTMLElement

export const Fieldset = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowFieldset.Root
        {...props}
        // native props
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
      />
    )
  },
)

Fieldset.displayName = 'Fieldset'

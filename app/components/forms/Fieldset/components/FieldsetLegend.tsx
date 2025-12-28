import { Fieldset as RowFieldset } from '@base-ui/react/fieldset'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'fieldset-legend'

type RowFieldsetLegendProps = ComponentProps<typeof RowFieldset.Legend>

type CustomProps = {}

type Props = RowFieldsetLegendProps & CustomProps

type Ref = ElementRef<'div'>

export const FieldsetLegend = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowFieldset.Legend
        {...props}
        // native props
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
      />
    )
  },
)

FieldsetLegend.displayName = 'FieldsetLegend'

import clsx from 'clsx'
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import { Theme } from '@/functions/types'
import styles from '../index.module.scss'

const BLOCK_NAME = 'label'
type Props = { theme?: Theme } & ComponentPropsWithoutRef<'span'>
type Ref = ElementRef<'span'>
export const Label = forwardRef<Ref, Props>(
  ({ theme = 'primary', className, ...props }, ref) => {
    return (
      <span
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        data-theme={theme}
        ref={ref}
        {...props}
      />
    )
  },
)

Label.displayName = 'Label'

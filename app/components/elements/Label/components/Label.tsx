import { Theme } from '@/functions/types'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

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

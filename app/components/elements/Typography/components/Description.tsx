import clsx from 'clsx'
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import styles from '../index.module.scss'

const BLOCK_NAME = 'typography'
type Props = {
  fontSize?: number
  lineClamp?: number
} & ComponentPropsWithoutRef<'p'>
type Ref = ElementRef<'p'>
export const Description = forwardRef<Ref, Props>(
  ({ className, fontSize = 3, lineClamp = 1, ...props }, ref) => (
    <p
      data-font-size={fontSize}
      data-line-clamp={lineClamp}
      {...props}
      ref={ref}
      className={clsx(styles[`${BLOCK_NAME}-description`], className)}
    />
  ),
)

Description.displayName = 'Description'

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import styles from '../index.module.scss'

const BLOCK_NAME = 'card'
type Props = ComponentPropsWithoutRef<'div'> & {}
type Ref = ElementRef<'div'>
export const CardBody = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={clsx(styles[`${BLOCK_NAME}-body`], className)}
        ref={ref}
        {...props}
      />
    )
  },
)

CardBody.displayName = 'CardBody'

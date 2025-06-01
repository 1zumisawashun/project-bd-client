import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

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

import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'card-body'

type CardBodyProps = ComponentPropsWithoutRef<'div'>

type CustomProps = {}

type Props = CardBodyProps & CustomProps

type Ref = ElementRef<'div'>

export const CardBody = forwardRef<Ref, Props>(
  (
    {
      // native props
      className,
      // other props
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        ref={ref}
        {...props}
      />
    )
  },
)

CardBody.displayName = 'CardBody'

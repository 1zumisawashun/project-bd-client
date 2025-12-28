import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import styles from './index.module.css'

const BLOCK_NAME = 'loading-dot'

type LoadingDotProps = ComponentPropsWithoutRef<'div'>

type CustomProps = {}

type Props = LoadingDotProps & CustomProps

type Ref = ElementRef<'div'>

export const LoadingDot = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        {...props}
        // native props
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
      >
        <span className={styles[`${BLOCK_NAME}-left-item`]} />
        <span className={styles[`${BLOCK_NAME}-center-item`]} />
        <span className={styles[`${BLOCK_NAME}-right-item`]} />
      </div>
    )
  },
)

LoadingDot.displayName = 'LoadingDot'

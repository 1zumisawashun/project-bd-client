import clsx from 'clsx'
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import styles from './index.module.scss'

const BLOCK_NAME = 'loading-dot'
type Props = {} & ComponentPropsWithoutRef<'div'>
type Ref = ElementRef<'div'>
export const LoadingDot: React.FC = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        {...props}
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

import clsx from 'clsx'
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import styles from './index.module.scss'

const BLOCK_NAME = 'loading-spinner'
type Props = {} & ComponentPropsWithoutRef<'div'>
type Ref = ElementRef<'div'>
export const LoadingSpinner: React.FC = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div className={styles[`${BLOCK_NAME}-overlay`]}>
        <div
          {...props}
          ref={ref}
          className={clsx(styles[`${BLOCK_NAME}`], className)}
        >
          <span className={styles[`${BLOCK_NAME}-item`]} />
        </div>
      </div>
    )
  },
)

LoadingSpinner.displayName = 'LoadingSpinner'

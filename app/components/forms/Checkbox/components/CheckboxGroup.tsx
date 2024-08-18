import clsx from 'clsx'
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import styles from '../index.module.scss'

const BLOCK_NAME = 'checkbox-group'
type Props = {} & ComponentPropsWithoutRef<'div'>
type Ref = ElementRef<'div'>
// FIXME: 本当はContextAPIを使って子要素にpropsを渡すべき
export const CheckboxGroup = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
      />
    )
  },
)

CheckboxGroup.displayName = 'CheckboxGroup'

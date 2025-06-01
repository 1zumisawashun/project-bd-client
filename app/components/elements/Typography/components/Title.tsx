import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'typography'

type As = `h${1 | 2 | 3 | 4 | 5 | 6}`
type Props = {
  as?: As
  fontSize?: number
  lineClamp?: number
} & ComponentPropsWithoutRef<'h2'>
type Ref = ElementRef<'h2'>
export const Title = forwardRef<Ref, Props>(
  ({ className, as = 'h2', fontSize = 4, lineClamp = 1, ...props }, ref) => {
    const Tag = as
    return (
      <Tag
        data-font-size={fontSize}
        data-line-clamp={lineClamp}
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}-title`], className)}
      />
    )
  },
)

Title.displayName = 'Title'

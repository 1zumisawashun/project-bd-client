import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'title'

type Heading = `h${1 | 2 | 3 | 4 | 5 | 6}`

type TitleProps<T extends Heading> = ComponentPropsWithoutRef<T>

type CustomProps<T extends Heading> = {
  as?: T
  fontSize?: number
  lineClamp?: number
}

type Props<T extends Heading> = CustomProps<T> & TitleProps<T>

type Ref = ElementRef<Heading>

export const Title = forwardRef<Ref, Props<Heading>>(
  ({ className, as = 'h2', fontSize = 4, lineClamp = 1, ...props }, ref) => {
    const Tag = as
    return (
      <Tag
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}-title`], className)}
        data-font-size={fontSize}
        data-line-clamp={lineClamp}
      />
    )
  },
)

Title.displayName = 'Title'

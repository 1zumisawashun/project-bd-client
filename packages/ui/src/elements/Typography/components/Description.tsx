import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'description'

type DescriptionProps = ComponentPropsWithoutRef<'p'>

type CustomProps = {
  fontSize?: number
  lineClamp?: number
}

type Props = DescriptionProps & CustomProps

type Ref = ElementRef<'p'>

export const Description = forwardRef<Ref, Props>(
  ({ className, fontSize = 3, lineClamp = 1, ...props }, ref) => (
    <p
      {...props}
      ref={ref}
      className={clsx(styles[`${BLOCK_NAME}`], className)}
      data-font-size={fontSize}
      data-line-clamp={lineClamp}
    />
  ),
)

Description.displayName = 'Description'

import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Align, Justify } from '@/functions/types'
import styles from './index.module.css'

const BLOCK_NAME = 'h-stack'

type HStackProps = ComponentPropsWithoutRef<'div'>

type CustomProps = { gap?: number; align?: Align; justify?: Justify }

type Props = HStackProps & CustomProps

type Ref = ElementRef<'div'>

export const HStack = forwardRef<Ref, Props>(
  (
    {
      // custom props
      gap = 4,
      align,
      justify,
      // native props
      className,
      // other props
      ...props
    },
    ref,
  ) => {
    return (
      <div
        {...props}
        // native props
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        ref={ref}
        // custom props
        data-gap={gap}
        data-align={align}
        data-justify={justify}
      />
    )
  },
)

HStack.displayName = 'HStack'

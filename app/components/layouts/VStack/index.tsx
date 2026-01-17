import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Align, Justify } from '@/functions/types'
import styles from './index.module.css'

const BLOCK_NAME = 'v-stack'

type VStackProps = ComponentPropsWithoutRef<'div'>

type CustomProps = { gap?: number; align?: Align; justify?: Justify }

type Props = VStackProps & CustomProps

type Ref = ElementRef<'div'>

export const VStack = forwardRef<Ref, Props>(
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

VStack.displayName = 'VStack'

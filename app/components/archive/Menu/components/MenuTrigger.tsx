import { useMergeRef } from '@/functions/hooks/useMergeRef'
import { useOuterClick } from '@/functions/hooks/useOuterClick'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useRef } from 'react'
import { useMenu } from '../hooks/useMenu'
import styles from '../index.module.css'

const BLOCK_NAME = 'menu'
type Ref = ElementRef<'button'>
type Props = {} & ComponentPropsWithoutRef<'button'>
export const MenuTrigger = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    const menu = useMenu()

    const referenceRef = useRef<ElementRef<'button'>>(null)

    const mergeRef = useMergeRef(ref, referenceRef)

    useOuterClick([referenceRef], () => {
      menu?.close()
    })

    return (
      <button
        type="button"
        className={clsx(styles[`${BLOCK_NAME}-trigger`], className)}
        {...props}
        ref={mergeRef}
        onClick={() => menu?.open()}
      />
    )
  },
)

MenuTrigger.displayName = 'MenuTrigger'

import clsx from 'clsx'
import { ElementRef, forwardRef, ComponentPropsWithoutRef, useRef } from 'react'
import { useOuterClick } from '@/functions/hooks/useOuterClick'
import styles from '../index.module.scss'
import { useMenu } from '../hooks/useMenu'

const BLOCK_NAME = 'menu'
type Ref = ElementRef<'button'>
type Props = {} & ComponentPropsWithoutRef<'button'>
export const MenuTrigger = forwardRef<Ref, Props>(({ className, ...props }) => {
  const menu = useMenu()

  const referenceRef = useRef<ElementRef<'button'>>(null)

  useOuterClick([referenceRef], () => {
    menu?.close()
  })

  return (
    <button
      type="button"
      className={clsx(styles[`${BLOCK_NAME}-trigger`], className)}
      {...props}
      ref={referenceRef}
      onClick={() => menu?.open()}
    />
  )
})

MenuTrigger.displayName = 'MenuTrigger'

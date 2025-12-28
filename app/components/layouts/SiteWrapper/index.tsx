import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Footer } from '../../elements/Footer'
import { Header } from '../../elements/Header'
import styles from './index.module.css'

const BLOCK_NAME = 'site-wrapper'

type StickyWrapperProps = ComponentPropsWithoutRef<'div'>

type CustomProps = {}

type Props = StickyWrapperProps & CustomProps

type Ref = ElementRef<'div'>

/**
 * NOTE:
 * RSCに依存しているためカタログに追加できない
 * @see https://twitter.com/tak_dcxi/status/1471627450106974215
 */
export const SiteWrapper = forwardRef<Ref, Props>(({ children }, ref) => {
  return (
    <div className={styles[`${BLOCK_NAME}`]} ref={ref}>
      <Header />
      <main className={styles[`${BLOCK_NAME}-inner`]}>{children}</main>
      <Footer />
    </div>
  )
})

SiteWrapper.displayName = 'SiteWrapper'

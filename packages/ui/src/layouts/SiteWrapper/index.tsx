import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Footer } from '../../elements/Footer'
import { Header } from '../../elements/Header'
import styles from './index.module.css'

const BLOCK_NAME = 'site-wrapper'

type Session = { user?: { id?: string; [key: string]: unknown } } | null

type StickyWrapperProps = ComponentPropsWithoutRef<'div'>

type CustomProps = {
  session: Session
}

type Props = StickyWrapperProps & CustomProps

type Ref = ElementRef<'div'>

/**
 * NOTE:
 * RSCに依存しているためカタログに追加できない
 * @see https://twitter.com/tak_dcxi/status/1471627450106974215
 */
export const SiteWrapper = forwardRef<Ref, Props>(
  ({ children, session }, ref) => {
    return (
      <div className={styles[`${BLOCK_NAME}`]} ref={ref}>
        <Header session={session} />
        <main className={styles[`${BLOCK_NAME}-inner`]}>{children}</main>
        <Footer />
      </div>
    )
  },
)

SiteWrapper.displayName = 'SiteWrapper'

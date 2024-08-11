import { AnchorButton } from '../../buttons/AnchorButton'
import styles from './index.module.scss'

type SubHeaderProps = {
  children: React.ReactNode
  href?: string
  title?: string
}

const BLOCK_NAME = 'sub-header'

export const SubHeader: React.FC<SubHeaderProps> = ({
  children,
  href,
  title,
}) => {
  return (
    <section>
      {href ? (
        <AnchorButton
          href={href}
          className={styles[`${BLOCK_NAME}-back-button`]}
        >
          ← back
        </AnchorButton>
      ) : null}
      {title ? (
        <h2 className={styles[`${BLOCK_NAME}-title`]}>{title}</h2>
      ) : null}
      {children}
    </section>
  )
}

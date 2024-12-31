'use client'

import styles from './index.module.scss'

const BLOCK_NAME = 'footer'
export const Footer: React.FC = () => {
  return (
    <footer className={styles[`${BLOCK_NAME}`]}>
      <p>
        Copyright &copy;
        <span
          id="year"
          ref={(node) => {
            if (!node) return
            node.innerHTML = new Date().getFullYear().toString()
          }}
        />
        &nbsp; All Rights Reserved
      </p>
    </footer>
  )
}

'use client'

import { FC } from 'react'
import styles from './index.module.css'

const BLOCK_NAME = 'footer'

export const Footer: FC = () => {
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

/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react'
import styles from './cssModulesSample.module.css'

export const CssModulesSample: React.FC = () => {
  return (
    <React.Fragment>
      <div className={styles['sample1']}>
        <p>{`& :nth-child(1)`}</p>
        <p>{`& > :nth-child(2)`}</p>
        <p>{`&.sample1 :nth-child(3)`}</p>
        <p>{`&.sample1 > :nth-child(4)`}</p>
      </div>
      <div className={styles['sample2']}>
        <p className={styles['paragraph1']}>{`& .paragraph1`}</p>
        <p className={styles['paragraph2']}>{`> .paragraph2`}</p>
        <p className={styles['paragraph3']}>{`.paragraph3`}</p>
      </div>
      <div className={styles['roleFormContainer']}>
        <form className="ui form">
          <div className="field">
            <label className={'label'}>Role</label>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

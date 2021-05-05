import React from 'react'
import styles from './CardActionButton.module.css'

const CardActionButton = ({btnAction, component, count}) => (
  <button className={styles['action-btn']} onClick={btnAction}>
    {component}
    {count ? <span style={{marginLeft: '6px'}}>{count}</span> : <></>}
  </button>
)

export default CardActionButton
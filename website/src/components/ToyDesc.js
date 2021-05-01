import React from 'react'
import styles from './ToyDesc.module.css'

const ToyDesc = ({description}) => (
  <div>
    <span className={styles.heading}>Three-piece Set: </span>{description['three_piece_effect']}
    <br />
    <span className={styles.heading}>Six-piece Set: </span>{description['six_piece_effect']}
    <br />
    <span className={styles.heading}>Awakening effect: </span>{description['awakening_effect']}
  </div>
)

export default ToyDesc
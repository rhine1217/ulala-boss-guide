import React from 'react'
import LogoLg from './logo-lg.png'
import LogoSm from './logo-sm.jpeg'
import styles from './Logo.module.css'

const Logo = (props) => (

    <img className={styles.logoLg} src={LogoLg} alt="Logo Large" />

)

export default Logo
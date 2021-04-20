import React from 'react'
import styles from './Navbar.module.css'
import logo from './logo-lg.png'


const Navbar = ({currentUser}) => (
  <div className={styles.header}>
  <div className="container">
    <div className={styles.navmenu}>
      <a href="/"><img className={styles.logo} src={logo} alt="logo"/></a>
      { currentUser ? 
          <>
          {currentUser.username}
          <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/user/logout`}>Log out</a>
          </> : 
          <a href={`${process.env.REACT_APP_BACKEND_URL}/oauth2/login`}>Log in</a>}
    </div>
  </div>
  </div>
)

export default Navbar


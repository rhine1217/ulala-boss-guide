import React from 'react'
import styles from './Navbar.module.css'
import logo from './logo-lg.png'
import { Avatar, Menu, Dropdown } from 'antd'


const Navbar = ({currentUser}) => {

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="/add">Add a Setup</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="/">Saved Setups</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/user/logout`}>Log out</a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={styles.header}>
    <div className="container">
      <div className={styles.navmenu}>
        <a href="/"><img className={styles.logo} src={logo} alt="logo"/></a>
        { currentUser ? 
            <>

              <Dropdown overlay={menu} trigger={['click']}>
              <div className={styles.dropdown}>
                <Avatar src={`https://cdn.discordapp.com/avatars/${currentUser.uid}/${currentUser.avatar}.png`} />
                <div>{currentUser.username}</div>
              </div>
              </Dropdown>
            </> : 
            <a href={`${process.env.REACT_APP_BACKEND_URL}/oauth2/login`}>Log in</a>}
      </div>
    </div>
    </div>
  )
}

export default Navbar
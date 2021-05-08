import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import logo from './logo-lg.png'
import { Avatar, Menu, Dropdown } from 'antd'
import BossInput from '../components/BossInput'
import debounce from '../utils/debounce';

const Navbar = ({currentUser}) => {

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setWidth(window.innerWidth)
    }, 500)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="/setup/add">Add a Setup</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="/favourite">Favourite Setups</a>
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
        <div style={{width: `${width*0.5}px`, maxWidth: '400px'}}><BossInput context="search" /></div>
        { currentUser ? 
            <>
              <Dropdown overlay={menu} trigger={['click']}>
              <div className={styles.dropdown}>
                <Avatar src={`${currentUser.avatar ? `https://cdn.discordapp.com/avatars/${currentUser.uid}/${currentUser.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'}`} />
                {width >= 576 ? <div>{currentUser.username}</div> : <></>}
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
import React from 'react'
import Logo from './Logo/Logo.jsx'
import NavMenu from './NavMenu/NavMenu.jsx'
import styles from './LeftNav.module.css'

import { Layout } from 'antd'

const { Header, Content, Footer, Sider } = Layout

const LeftNav = (props) => (
    <>
    <Sider className={styles.leftNavSider}>
      <Logo />
    <NavMenu />

    </Sider>
    </>
)

export default LeftNav
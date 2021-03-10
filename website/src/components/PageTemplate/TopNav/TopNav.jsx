import React from 'react'
import User from './User/User.jsx'
import styles from './TopNav.module.css'
import { Layout } from 'antd'

const { Header, Content, Footer, Sider } = Layout

const TopNav = (props) => (
    <>
    <Header className={`site-layout-background ${styles.header}`}>
    <User />
    </Header>
    </>
)

export default TopNav
import React from 'react'
import {
    PlusOutlined,
    ReconciliationOutlined,
    NodeIndexOutlined,
    ControlOutlined,
    SettingOutlined,
    LogoutOutlined,
  } from '@ant-design/icons';

import { Menu } from 'antd'

import styles from './NavMenu.module.css'

const navItems = [
    'New Sim', 
    'View Reports', 
    'Link Account', 
    'Saved Configs', 
    'Settings', 
    'Log Out'
]

const navIcons = [    
    <PlusOutlined />,
    <ReconciliationOutlined />,
    <NodeIndexOutlined />,
    <ControlOutlined />,
    <SettingOutlined />,
    <LogoutOutlined />,
]

const NavMenu = (props) => (
    <>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} className={styles.navItems}>

    {navItems.map((item, idx) => 

        <Menu.Item key={idx} icon={navIcons[idx]}>{item}</Menu.Item>

    )}

    </Menu>
    </>
)

export default NavMenu
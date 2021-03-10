import React from 'react'
import styles from './User.module.css'
import { Avatar } from 'antd'

const User = (props) => (
    <>
    <div className={styles.userName}>Username</div>
    <Avatar className={styles.userAvatar} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </>
)

export default User
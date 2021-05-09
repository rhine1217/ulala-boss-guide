import React from 'react'
import { Avatar } from 'antd'

const UserAvatar = ({user}) => {
  return (
    <>
    {user ? <Avatar src={`${user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'}`} /> : <></>}
    </>
  )
}

export default UserAvatar
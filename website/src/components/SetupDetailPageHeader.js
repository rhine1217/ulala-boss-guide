import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { PageHeader, Dropdown, Menu } from 'antd'
import { LikeOutlined, StarOutlined, LikeFilled, StarFilled, MoreOutlined } from '@ant-design/icons'
import styles from './SetupDetailPageHeader.module.css'
import Setup from '../Models/Setup'

const SetupDetailPageHeader = ({bossSetup, userActions, currentUser}) => {

  const [redirect, setRedirect] = useState(null)
  const [redirectProps, setRedirectProps] = useState(null)

  const handleMenuClick = async (e) => {
    if (e.key === 'duplicate') {
      setRedirect('/setup/add')
      setRedirectProps(bossSetup)
    } else if (e.key === 'delete') {
      try {
        const response = await Setup.Destroy(bossSetup.id)
        if (response.status === 204) {
          setRedirect('/favourite')
        }
      } catch (errors) {
        console.log(errors)
      }
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {
        bossSetup.created_by === currentUser.username ? 
        <Menu.Item key="delete"><span style={{color: '#f5222d'}}>Delete</span></Menu.Item> :
        <Menu.Item key="duplicate"><span>Duplicate</span></Menu.Item>
      }
    </Menu>
  )
  if (redirect) {
    return (
    <Redirect push to={{
      pathname: redirect,
      state: redirectProps
    }} /> )
  }
  return (
  <PageHeader 
  title={bossSetup.boss.name}
  subTitle={`Submitted by ${bossSetup['created_by']}`}
  extra={[
    <span 
      key='like' 
      className={styles['action-btn']} 
      onClick={() => userActions(bossSetup.id, `${bossSetup['liked_by_current_user'] ? 'onUnlike' : 'onLike'}`)}
    >
      {bossSetup['liked_by_current_user'] ? <LikeFilled /> : <LikeOutlined />}
      <span style={{marginLeft: '6px'}}>{bossSetup.likes}</span>
    </span>,
    <span 
      key='star' 
      className={styles['action-btn']}
      onClick={() => userActions(bossSetup.id, `${bossSetup['favourited_by_current_user'] ? 'onUnfavourite' : 'onFavourite'}`)} 
    >
      {bossSetup['favourited_by_current_user'] ? <StarFilled /> : <StarOutlined />}
      <span style={{marginLeft: '6px'}}>{bossSetup.favourites}</span>
    </span>,
    <Dropdown key='more' overlay={menu} placement="bottomRight" trigger={['click', 'contextMenu']}>
      <span className={styles['action-btn']}><MoreOutlined /></span>
    </Dropdown>
  ]} />
)
}

export default SetupDetailPageHeader
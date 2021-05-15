import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { PageHeader, Dropdown, Menu, Modal } from 'antd'
import { LikeOutlined, StarOutlined, LikeFilled, StarFilled, MoreOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
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
      Modal.confirm({
        title: 'Are you sure you want to delete this setup?',
        okButtonProps: {
          danger: true
        },
        okText: 'Yes, Delete',
        cancelButtonProps: {
          type: 'default'
        },
        cancelText: 'No, Cancel',
        icon: <ExclamationCircleOutlined style={{color: '#ff4d4f'}} />,
        maskClosable: true,
        onOk: async () => {
          try {
            const response = await Setup.Destroy(bossSetup.id)
            if (response.status === 204) {
              setRedirect('/favourite')
            }
          } catch (errors) {
            console.log(errors)
          }
        }
      })
    }
  }

  const renderHeaderActions = (currentUser) => {
    if (currentUser) {
      const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="duplicate"><span>Duplicate</span></Menu.Item>
          {bossSetup.created_by === currentUser.username ? 
          <Menu.Item key="delete"><span style={{color: '#ff4d4f'}}>Delete</span></Menu.Item> : <></>}
        </Menu>
      )
      return ([
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
    
      ])
    } else {
      return ([
        <span 
          key='like' 
          className={styles['action-btn']} 
          onClick={() => window.location.href = `${process.env.REACT_APP_BACKEND_URL}/oauth2/login`}
        >
          <LikeOutlined />
          <span style={{marginLeft: '6px'}}>{bossSetup.likes}</span>
        </span>,
        <span 
          key='star' 
          className={styles['action-btn']}
          onClick={() => window.location.href = `${process.env.REACT_APP_BACKEND_URL}/oauth2/login`}
        >
          <StarOutlined />
          <span style={{marginLeft: '6px'}}>{bossSetup.favourites}</span>
        </span>,
      ])
    }
  }

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
    onBack={() => window.history.back()}
    subTitle={`Submitted by ${bossSetup['created_by']}`}
    extra={renderHeaderActions(currentUser)} />
  )
}

export default SetupDetailPageHeader
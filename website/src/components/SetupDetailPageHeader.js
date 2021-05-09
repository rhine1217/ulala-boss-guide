import React from 'react'
import { PageHeader } from 'antd'
import { LikeOutlined, StarOutlined, LikeFilled, StarFilled } from '@ant-design/icons'
import styles from './SetupDetailPageHeader.module.css'

const SetupDetailPageHeader = ({bossSetup, userActions,}) => (

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
  ]} />

)

export default SetupDetailPageHeader
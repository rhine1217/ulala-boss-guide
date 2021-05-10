import React from 'react'
import CardActionButton from './CardActionButton'
import { LikeOutlined, StarOutlined, LikeFilled, StarFilled, EditOutlined, DeleteOutlined, CloudUploadOutlined, MessageOutlined } from '@ant-design/icons'
import { message } from 'antd'

export const renderCardActions = (result, userActions, currentUser) => {
  if (currentUser) {
    const cardActions = {
      Draft: [
        <CardActionButton 
          btnAction={(e) => {userActions(e, result.id, 'onPublish')}} 
          component={<CloudUploadOutlined />} 
        />,
        <a onClick={e => e.stopPropagation()} href={`/setup/edit/${result.id}`}><EditOutlined /></a>,
        <CardActionButton 
          btnAction={(e) => {userActions(e, result.id, 'onDelete')}} 
          component={<DeleteOutlined />} />,
      ],
      Published: [
        <CardActionButton 
          btnAction={(e) => {userActions(e, result.id, `${result.liked_by_current_user ? 'onUnlike' : 'onLike'}`)}} component={result.liked_by_current_user ? <LikeFilled /> : <LikeOutlined />} 
          count={result.likes} 
        />,
        <CardActionButton 
          btnAction={(e) => {userActions(e, result.id, `${result.favourited_by_current_user ? 'onUnfavourite' : 'onFavourite'}`)}} 
          component={result.favourited_by_current_user ? <StarFilled /> : <StarOutlined />} 
          count={result.favourites} 
        />,
        <a onClick={e => e.stopPropagation()} href={`/setup/${result.id}`}><MessageOutlined /><span style={{marginLeft: '6px'}}>{result.comments === 0 ? '' : result.comments_count }</span></a>
      ],
    }
    return cardActions[result.status]
  } else {
    return ([
    <CardActionButton 
      btnAction={e => {e.stopPropagation(); message.warning('Please log in first!', 2)}} component={<LikeOutlined />} count={result.likes} 
    />,
    <CardActionButton 
      btnAction={e => {e.stopPropagation(); message.warning('Please log in first!', 2)}} component={<StarOutlined />} count={result.favourites} 
    />,
    <a onClick={e => e.stopPropagation()} href={`/setup/${result.id}`}><MessageOutlined /><span style={{marginLeft: '6px'}}>{result.comments === 0 ? '' : result.comments_count }</span></a>
    ])
  }
}
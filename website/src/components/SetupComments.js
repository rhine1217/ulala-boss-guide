import React, { useState } from 'react'
import UserAvatar from '../components/UserAvatar'
import { Comment, Form, Button, List, Input, Tooltip } from 'antd'
import moment from 'moment'

const SetupComment = ({comment, currentUser, deleteComment}) => {
  const isDeleteAvailable = currentUser.id === comment.user.id
  const [isDeleteVisible, setIsDeleteVisible] = useState(false)
  
  return (
    <div onMouseEnter={() => setIsDeleteVisible(true)} onMouseLeave={() => setIsDeleteVisible(false)}>
        <Comment 
        avatar={<UserAvatar user={comment.user} />}
        author={<div>{comment.user.name}</div>} 
        content={<div>{comment.comment}</div>}
        datetime={
          <Tooltip title={moment(comment['posted_date']).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(comment['posted_date']).fromNow()}</span>
          </Tooltip>
        }
        actions={isDeleteAvailable && isDeleteVisible ? [<span key='delete' onClick={() => deleteComment(comment.id)}>Delete</span>] : []}
      />
    </div>
  )

}

const CommentList = ({comments, currentUser, deleteComment}) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}`}
    itemLayout="horizontal"
    renderItem={comment => <SetupComment comment={comment} currentUser={currentUser} deleteComment={deleteComment}/>}
  />
)

const Editor = ({ onChange, handleSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <Input.TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button loading={submitting} onClick={(e) => handleSubmit(e, value)} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const SetupComments = ({comments, currentUser, isAddCommentLoading, handleSubmit, handleChange, commentValue, deleteComment}) => (
  <>
    {comments.length > 0 && <CommentList comments={comments} currentUser={currentUser} deleteComment={deleteComment}/>}
    <Comment 
      avatar={<UserAvatar user={currentUser} />}
      content={
        <Editor onChange={handleChange} handleSubmit={handleSubmit} submitting={isAddCommentLoading} value={commentValue} />}
    />
  </>
)

export default SetupComments

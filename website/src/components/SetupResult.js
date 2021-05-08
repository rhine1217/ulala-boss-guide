import React, { useState } from 'react'
import { Card, Tag, Col, Row, Popover, Badge, Modal, Input, Button } from 'antd'
import { ShareAltOutlined, LikeOutlined, StarOutlined, LikeFilled, StarFilled, InfoCircleOutlined, EditOutlined, DeleteOutlined, CloudUploadOutlined, MessageOutlined } from '@ant-design/icons'
import { classTagsColor } from '../utils/charClassUtils'
import SkillIcon from './SkillIcon'
import ToyIcon from './ToyIcon'
import CardActionButton from './CardActionButton'

const SetupResult = ({result, userActions}) => {

  const [activeClassIdx, setActiveClassIdx] = useState(0)
  const [activeSetup, setActiveSetup] = useState(result['player_setup'][0])
  const [isSharingModalVisible, setisSharingModalVisible] = useState(false)
  const [isLinkCopied, setIsLinkCopied] = useState(false)
  const [copyLinkBtnType, setCopyLinkBtnType] = useState('default')

  const context = 'result'
  const setupLink = `${process.env.REACT_APP_HOST_NAME}/setup/${result.id}`

  const changeActiveClass = (idx) => {
    setActiveClassIdx(idx)
    setActiveSetup(result['player_setup'][idx])
  }

  const showLinkToShare = () => setisSharingModalVisible(true)

  const handleModalCancel = () => {
    setisSharingModalVisible(false)
    setIsLinkCopied(false)
    setCopyLinkBtnType('default')
  }

  const copyLink = () => {
    setIsLinkCopied(true)
    setCopyLinkBtnType('primary')
    navigator.clipboard.writeText(setupLink)
  }

  const infoContent = (
    <>
      <div>Map Area</div>
      <div>"{result.note}"</div>
    </>)

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
      <a onClick={e => e.stopPropagation()} href='/'><MessageOutlined /><span style={{marginLeft: '6px'}}>{result.comments === 0 ? '' : result.comments }</span></a>
    ]
  }

  return (

  <Badge.Ribbon text={result.status} color={result.status === 'Published' ? 'blue' : 'gold'}>
      <Card hoverable
      onClick={() => console.log('fds')}
      actions={cardActions[result.status]}>
      <Row gutter={[16,16]}>
        <Col span={24}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div>
            <Popover placement="bottomLeft" title={<span>Setup Notes</span>} content={infoContent}>
              <InfoCircleOutlined />
            </Popover>
            </div>
            <div style={{marginLeft: '12px'}}>{result.boss.name}</div>
          </div>
        </Col>
        <Col span={24}>
          <Row>
          {result['player_classes'].map((playerClass, idx) => (
            <Col span={6} key={idx}>
            <Tag 
            color={idx === activeClassIdx ? classTagsColor[playerClass] : "default"}
            onClick={() => changeActiveClass(idx)}
            style={{display: 'block', width: '100%', textAlign: 'center'}}
            >{playerClass}</Tag>
            </Col>
            ))}
          </Row>
        </Col>
        {activeSetup['skills'].map((skill, idx) => (
          <Col span={6} key={idx} style={{display: 'flex', justifyContent: 'center'}}>
            <SkillIcon skill={skill} context={context} activeClass={activeSetup['player_class']} />
          </Col>
        ))}
        {activeSetup['toys'].map((toy, idx) => (
          <Col span={6} key={idx} style={{display: 'flex', justifyContent: 'center'}}>
            <ToyIcon toy={toy} context={context} />
          </Col>
        ))}
        <Col span={24} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div>Submitted by {result['created_by']}</div>
          <a onClick={showLinkToShare}><ShareAltOutlined /></a>
        </Col>
        </Row>
    </Card>
    <Modal title="Link to Share" visible={isSharingModalVisible} centered footer={null} onCancel={handleModalCancel}>
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Input value={setupLink}></Input>
        </Col>
        <Col span={6}>
          <Button style={{width: '100%'}} type={copyLinkBtnType} onClick={copyLink}>{isLinkCopied ? 'Copied!' : 'Copy Link'}</Button>
        </Col>
      </Row>
    </Modal>
  </Badge.Ribbon>
  )
}

export default SetupResult
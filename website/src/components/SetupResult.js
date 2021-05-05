import React, { useState } from 'react'
import { Card, Tag, Col, Row, Popover, Badge, Modal, Input, Button, Form } from 'antd'
import { ShareAltOutlined, LikeOutlined, StarOutlined, LikeFilled, StarFilled, InfoCircleOutlined, EditOutlined, DeleteOutlined, CloudUploadOutlined, MessageOutlined } from '@ant-design/icons'
import { classTagsColor } from '../utils/charClassUtils'
import SkillIcon from './SkillIcon'
import ToyIcon from './ToyIcon'
import Setup from '../Models/Setup'

const SetupResult = ({result, onPublish}) => {

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

  const onDelete = () => {
    console.log('on delete')
  }

  const onInteract = (action) => {
    console.log(action)
  }

  const showLinkToShare = () => {
    setisSharingModalVisible(true)
  }

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
      <a onClick={() => onPublish(result.id)}><CloudUploadOutlined /></a>,
      <a href={`/setup/edit/${result.id}`}><EditOutlined /></a>,
      <a onClick={onDelete}><DeleteOutlined /></a>
    ],
    Published: [
      <a onClick={() => onInteract('like')}><LikeOutlined /><span style={{marginLeft: '6px'}}>15</span></a>,
      <a onClick={() => onInteract('favourite')}><StarOutlined /><span style={{marginLeft: '6px'}}>15</span></a>,
      <a href='/'><MessageOutlined /><span style={{marginLeft: '6px'}}>15</span></a>
    ]
  }

  return (

  <Badge.Ribbon text={result.status}>
    <Card hoverable
      actions={cardActions[result.status]}>
      {/* actions={cardActions['Published']}> */}
      <Row gutter={[16,16]}>
        <Col span={24}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Popover placement="bottomLeft" title={<span>Setup Notes</span>} content={infoContent}>
              <InfoCircleOutlined />
            </Popover>
            <div style={{marginLeft: '12px'}}>{result.boss.name}</div>
          </div>
        </Col>
        <Col span={24}>
          <Row>
          {result['player_classes'].sort().map((playerClass, idx) => (
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
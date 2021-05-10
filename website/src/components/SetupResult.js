import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Col, Row, Popover, Badge, Modal, Input, Button } from 'antd'
import { ShareAltOutlined, LikeOutlined, StarOutlined, LikeFilled, StarFilled, InfoCircleOutlined, EditOutlined, DeleteOutlined, CloudUploadOutlined, MessageOutlined } from '@ant-design/icons'
import SkillIcon from './SkillIcon'
import ToyIcon from './ToyIcon'
// import CardActionButton from './CardActionButton'
import { renderCardActions } from './SetupResultCardActions'
import ClassTabs from './ClassTabs'
import moment from 'moment'

const SetupResult = ({result, userActions, currentUser}) => {

  const [activeClassIdx, setActiveClassIdx] = useState(0)
  const [activeSetup, setActiveSetup] = useState(result['player_setup'][0])
  const [isSharingModalVisible, setisSharingModalVisible] = useState(false)
  const [isLinkCopied, setIsLinkCopied] = useState(false)
  const [copyLinkBtnType, setCopyLinkBtnType] = useState('default')

  const context = 'result'
  const history = useHistory()
  const setupLink = `${process.env.REACT_APP_HOST_NAME}/setup/${result.id}`

  const changeActiveClass = (idx) => {
    setActiveClassIdx(idx)
    setActiveSetup(result['player_setup'][idx])
  }

  const showLinkToShare = () => setisSharingModalVisible(true)

  const goToSetupDetail = () => history.push(`/setup/${result.status === 'Draft'? 'edit/' : ''}${result.id}`)

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


  return (
  <Badge.Ribbon text={result.status} color={result.status === 'Published' ? 'blue' : 'gold'}>
      <Card hoverable
      onClick={goToSetupDetail}
      actions={renderCardActions(result, userActions, currentUser)}>
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
          <ClassTabs result={result} activeClassIdx={activeClassIdx} changeActiveClass={changeActiveClass} />
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
        <div>
          <span>{result.status === 'Published' ? 'Submitted' : 'Created'} by {result['created_by']} </span>
          {result.status === 'Published' ? <span style={{fontSize: '12px', color: 'rgba(0,0,0,0.45)'}}>{moment(result['published_on']).fromNow()}</span> : <></>}
        </div>
          <a onClick={(e) => {e.stopPropagation(); showLinkToShare()}}><ShareAltOutlined /></a>
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
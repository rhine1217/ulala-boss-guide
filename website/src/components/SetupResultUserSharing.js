import React from 'react'
import moment from 'moment'
import { Col, Modal, Row, Input, Button } from 'antd'
import { ShareAltOutlined } from '@ant-design/icons'

export const SetupResultUser = ({result, showLinkToShare}) => (

  <Col span={24} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
  <div>
    <span>{result.status === 'Published' ? 'Submitted' : 'Created'} by {result['created_by']} </span>
    {result.status === 'Published' ? <span style={{fontSize: '12px', color: 'rgba(0,0,0,0.45)'}}>{moment(result['published_on']).fromNow()}</span> : <></>}
  </div>
    <a onClick={(e) => {e.stopPropagation(); showLinkToShare()}}><ShareAltOutlined /></a>
  </Col>
  
)

export const SetupResultSharing = ({setupLink, isSharingModalVisible, handleModalCancel, copyLinkBtnType, copyLink, isLinkCopied}) => {

  return (
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
  )
}
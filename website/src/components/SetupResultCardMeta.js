import React from 'react'
import { Col, Popover, Row } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import ClassTabs from './ClassTabs'

const SetupResultCardMeta = ({result, activeClassIdx, changeActiveClass}) => {

  const infoContent = (
    <>
      <div>Map Area</div>
      <div>"{result.note}"</div>
    </>
  )
  return (
    <>
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
    </>
  )
}

export default SetupResultCardMeta
import React from 'react'
import { Row, Col, Tag } from 'antd'
import { classTagsColor } from '../utils/charClassUtils'

const ClassTabs = ({result, activeClassIdx, changeActiveClass}) => (
  <>
  {result['player_classes'].map((playerClass, idx) => (
    <Col span={6} key={idx}>
    <Tag 
    color={idx === activeClassIdx ? classTagsColor[playerClass] : "default"}
    onClick={(e) => {e.stopPropagation(); changeActiveClass(idx)}}
    style={{display: 'block', width: '100%', textAlign: 'center'}}
    >{playerClass}</Tag>
    </Col>
    ))}
  </>
)

export default ClassTabs
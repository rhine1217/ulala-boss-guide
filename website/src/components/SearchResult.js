import React, { useState } from 'react'
import { Card, Tag, Col, Row } from 'antd'
import { ShareAltOutlined, LikeOutlined, StarOutlined, LikeFilled, StarFilled} from '@ant-design/icons'
import { classTagsColor } from '../utils/charClassUtils'
import SetupIcons from './SetupIcons.js'

const SearchResult = ({bossName, result}) => {

  const [activeClassIdx, setActiveClassIdx] = useState(0)
  const [activeSetup, setActiveSetup] = useState(result['player_setup'][0])

  const changeActiveClass = (idx) => {
    setActiveClassIdx(idx)
    setActiveSetup(result['player_setup'][idx])
  }

  return (

  <Card>
    <Row gutter={[16,16]}>
      <Col span={24}>
        <div>{bossName}</div>
      </Col>
      <Col span={24}>
        {result['player_classes'].map((playerClass, idx) => (
          <Tag 
            key={idx} color={idx === activeClassIdx ? classTagsColor[playerClass] : "default"}
            onClick={() => changeActiveClass(idx)}
            >{playerClass}</Tag>
        ))}
      </Col>
      {activeSetup['skills'].map((skill, idx) => (
        <Col span={6} key={idx} style={{display: 'flex', justifyContent: 'center'}}>
          <SetupIcons.Skill skill={skill} context='' activeClass={activeSetup['player_class']} />
        </Col>
      ))}
      {activeSetup['toys'].map((toy, idx) => (
        <Col span={6} key={idx} style={{display: 'flex', justifyContent: 'center'}}>
          <SetupIcons.Toy toy={toy} context='' />
        </Col>
      ))}

      <Col span={24}>{result.note}</Col>
      <Col span={24}>
      <div>Submitted by {result['created_by']}</div>
        <LikeOutlined />
        <StarOutlined />
        <ShareAltOutlined />
      </Col>
      </Row>
  </Card>

  )

}

export default SearchResult
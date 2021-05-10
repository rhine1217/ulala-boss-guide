import React from 'react'
import { Col } from 'antd'
import SkillIcon from './SkillIcon'
import ToyIcon from './ToyIcon'

const SetupResultCardIcons = ({activeSetup}) => {

  const context = 'result'
  
  return (
    <>
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
    </>
  )
}

export default SetupResultCardIcons
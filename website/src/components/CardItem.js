import React from 'react'
import { SortableElement } from 'react-sortable-hoc'
import SkillIcon from './SkillIcon'
import ToyIcon from './ToyIcon'
import SetupDesc from './SetupDesc'
import { Col, Card } from 'antd'
import { useRecoilValue } from 'recoil'
import { activeSetupTypeState } from '../states/atoms'

const CardItem = SortableElement(({context, skill, toy, activeClass}) => {

  const activeSetupType = useRecoilValue(activeSetupTypeState)
  const flexDirection = activeSetupType === 'skill' ? '' : 'row-reverse'
  return (
    <Col span={24}>
      <Card key={context} style={{cursor: 'grab'}}>
        <div style={{display: 'flex', alignItems: 'start', flexDirection: `${flexDirection}`}}>
          <SkillIcon skill={skill} context={`${activeSetupType}-${context}`} activeClass={activeClass}/>
          <SetupDesc value={activeSetupType === "skill" ? skill : toy} context={`${activeSetupType}-${context}`} />
          <ToyIcon toy={toy} context={`${activeSetupType}-${context}`} />
        </div>
      </Card>
    </Col>
  )
  
})

export default CardItem
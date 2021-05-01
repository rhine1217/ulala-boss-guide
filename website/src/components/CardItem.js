import React from 'react'
import { SortableElement } from 'react-sortable-hoc'
import SetupIcons from './SetupIcons.js'
import SetupDesc from './SetupDesc.js'
import { Col, Card } from 'antd'
import { useRecoilValue } from 'recoil'
import { activeSetupTypeState } from '../states/atoms'

const CardItem = SortableElement(({context, skill, toy, activeClass}) => {

  const activeSetupType = useRecoilValue(activeSetupTypeState)
  const flexDirection = activeSetupType === 'skill' ? '' : 'row-reverse'
  return (
    <Col span={24}>
      <Card key={context}>
        <div style={{display: 'flex', alignItems: 'start', flexDirection: `${flexDirection}`}}>
          <SetupIcons.Skill skill={skill} context={context} activeClass={activeClass}/>
          <SetupDesc value={activeSetupType === "skill" ? skill : toy} />
          <SetupIcons.Toy toy={toy} context='card' />
        </div>
      </Card>
    </Col>
  )
  
})

export default CardItem
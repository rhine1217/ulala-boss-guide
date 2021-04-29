import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import CardItem from './CardItem'
import { Row } from 'antd'

const CardList = SortableContainer(({activeClass, skills, toys}) => {
  return (
  <Row gutter={[16, 16]} style={{padding: '24px 24px'}}>
    {skills.map((skill, idx) => 
      <CardItem key={idx} index={idx} 
                skill={skill} toy={toys[idx]} activeClass={activeClass}
      />)}
  </Row>
  )
})

export default CardList
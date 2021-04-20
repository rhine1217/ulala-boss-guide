import React, { useState, useEffect } from 'react'
import { Card, Tooltip, Row, Col, Tag } from 'antd'
import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc'
import { classTagsColorState, classForSetupState } from '../states/atoms'
import { useRecoilValue } from 'recoil'
import Ulala from '../Models/Ulala'

const SkillSelection = () => {

  const classTagsColor = useRecoilValue(classTagsColorState)
  const classForSetup = useRecoilValue(classForSetupState)
  const [skills, setSkills] = useState([])
  const [currCharSkills, setCurrCharSkills] = useState([])

  useEffect(() => {
    const getSkillList = async () => {
      try {
        const skillList = await Ulala.SkillList()
        setSkills(skillList.data)
      } catch (error) {
        console.log(error)
      }
    }
    getSkillList()
  }, [])

  useEffect(() => {
    const refreshedSkills = skills.length > 0 ? skills.filter(skill => skill['related_class'] === classForSetup) : []
    setCurrCharSkills(refreshedSkills)
  }, [classForSetup])

  const onSortEnd = ({oldIndex, newIndex}) => {
    setSkills( skills => arrayMove(skills, oldIndex, newIndex))
  }

  const SortableItem = SortableElement(({value, colors}) => 
    <Col span={24}>
      <Card key={`card-${value.name}`}>
        <div style={{display: 'flex', alignItems: 'start'}}>
            <div style={{height: '50px', minWidth: '50px', backgroundColor: 'black'}}></div>
          <div style={{paddingLeft: '24px'}}>
            <Tag color={colors[classForSetup]}>{value.name}</Tag>
            {/* <Tooltip title={content} trigger="hover" placement="topLeft"> */}
              <div class="text-overflow" style={{fontSize: '12px', paddingTop: '12px', minHeight: '4em'}}>{value.description}</div>
            {/* </Tooltip> */}
          </div>
          </div>
      </Card>
    </Col>
  )

  const SortableList = SortableContainer(({items, colors}) => 
    <Row gutter={[16, 16]} style={{padding: '24px 24px'}}>
      {items.slice(0,4).map( (skill, idx) => <SortableItem key={skill.name} index={idx} value={skill} colors={colors}/>)}
    </Row>
  )

  return (
    <SortableList items={currCharSkills} onSortEnd={onSortEnd} colors={classTagsColor}/>
  )

}

export default SkillSelection
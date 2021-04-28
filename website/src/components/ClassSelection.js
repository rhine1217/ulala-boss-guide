import React from 'react'
import { Row, Col, Form, Tag } from 'antd'
import { useRecoilState } from 'recoil'
import { classTagState, classForSetupState } from '../states/atoms'
import { classTagsColor } from '../utils/charClassUtils'

const ClassSelection = ({context}) => {

  const [selectedClasses, setSelectedClasses] = useRecoilState(classTagState)
  const [classForSetup, setClassForSetup] = useRecoilState(classForSetupState)

  const toggleSelectedClasses = (charClass) => {
    const newSelectedClasses = [...selectedClasses]
    const idx = newSelectedClasses.indexOf(charClass)
    if (idx === -1) { // if this Class wasn't selected before
      newSelectedClasses.push(charClass) 
      if (!classForSetup) {
        setClassForSetup(charClass)
      }
    } else { // if this Class is already selected 
      newSelectedClasses.splice(idx, 1)
      if (charClass === classForSetup) {
        setClassForSetup(newSelectedClasses[0] || '')
      } 
    }
    setSelectedClasses(newSelectedClasses)
  }

  const formLabel = context === 'new' ? "Character Classes (Select 4)" : 'Filter by Class'
  const validateStatusLabel = () => {
    let status = ""
    if (context === 'new') {
      status = selectedClasses.length === 4 ? "success" : "warning"
    } else {
      status = selectedClasses.length <=4 ? "success" : "warning"
    }
    return status
  }

  return (
    <Form.Item label={formLabel} hasFeedback validateStatus={validateStatusLabel()}>
      <Row>
        <Col span={23}>
          <Row  gutter={[4,8]}>
          {Object.keys(classTagsColor).map((charClass, idx) => 
            <Col key={idx} >
              <Tag 
                color={ selectedClasses.includes(charClass) ? classTagsColor[charClass] : 'default' }
                onClick={ () => toggleSelectedClasses(charClass)}
                >
                {charClass}
              </Tag>
            </Col>
          )}                       
          </Row>
        </Col>
        <Col span={1}></Col>
      </Row>
    </Form.Item>

  )
}

export default ClassSelection
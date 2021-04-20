import React from 'react'
import { Row, Col, Form, Tag } from 'antd'
import { useRecoilState, useRecoilValue } from 'recoil'
import { classTagState, classTagsColorState, classForSetupState } from '../states/atoms'

const ClassSelection = () => {

  const [selectedClasses, setSelectedClasses] = useRecoilState(classTagState)
  const [classForSetup, setClassForSetup] = useRecoilState(classForSetupState)
  const classTagsColor = useRecoilValue(classTagsColorState)

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

  return (
    <Form.Item label="Character Classes (Select 4)" hasFeedback validateStatus={selectedClasses.length === 4 ? "success" : "warning"}>
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
import React, { useEffect } from 'react';
import { Form, Select } from 'antd'
import { useRecoilValue, useRecoilState } from 'recoil'
import { classTagState, classForSetupState } from '../states/atoms'
import { useLocation } from 'react-router-dom'

const { Option } = Select

const SetupPageDropdown = () => {

  const selectedClasses = useRecoilValue(classTagState)
  const [classForSetup, setClassForSetup] = useRecoilState(classForSetupState)
  const onSelect = (value) => setClassForSetup(value)

  let query = new URLSearchParams(useLocation().search)
  const queriedClassForSetup = query.get("classForSetup")

  useEffect(() => {
    if (queriedClassForSetup) {
      setClassForSetup(queriedClassForSetup)
    }
  }, [])

  return (
    <Form layout="horizontal" style={{padding: '0 24px'}}>
      <Form.Item required label="Select a Class to Configure Setup">
        <Select value={classForSetup || selectedClasses[0]} onSelect={onSelect}>
          {selectedClasses.map((selectedClass, idx) => 
            <Option key={`option-${idx}`} value={selectedClass}>{selectedClass}</Option>
          )}
        </Select>
      </Form.Item>
    </Form>
  )
}

export default SetupPageDropdown
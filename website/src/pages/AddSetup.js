import React from 'react'
import { PageHeader, Button, Form, Select, Radio } from 'antd'
import BossInput from '../components/BossInput'
import ClassSelection from '../components/ClassSelection'
import SkillSelection from '../components/SkillSelection'
import { useRecoilValue, useRecoilState } from 'recoil'
import { classTagState, classForSetupState } from '../states/atoms'

const { Option } = Select

const AddSetup = () => {

  const selectedClasses = useRecoilValue(classTagState)
  const [classForSetup, setClassForSetup] = useRecoilState(classForSetupState)

  const onSelect = (value) => setClassForSetup(value)

  return (
    <div>
      <PageHeader 
        title="Add a Setup"
        onBack={() => window.history.back()}
        extra={[
          <Button key="2">Save</Button>,
          <Button key="1" type="primary">Publish</Button>
        ]} />

      <Form layout="vertical" style={{padding: '16px 24px 0px'}}>
        <Form.Item label="Boss">
          <BossInput type="form" />
        </Form.Item>
        <ClassSelection />
      </Form>

      <Form layout="horizontal" style={{padding: '0 24px'}}>
        <Form.Item label="Select a Class to Configure Setup">
          <Select value={classForSetup || selectedClasses[0]} onSelect={onSelect}>
            {selectedClasses.map((selectedClass, idx) => 
              <Option key={`option-${idx}`} value={selectedClass}>{selectedClass}</Option>
            )}
          </Select>
        </Form.Item>
      </Form>

      <div style={{padding: '0 24px', textAlign: 'center'}}>
      <Radio.Group size="small" defaultValue="skill" buttonStyle="solid">
        <Radio.Button style={{width: '100px'}} value="skill">Skill</Radio.Button>
        <Radio.Button style={{width: '100px'}} value="toy">Toy</Radio.Button>
      </Radio.Group>
      </div>

      <SkillSelection />

    </div>
  )
}

export default AddSetup
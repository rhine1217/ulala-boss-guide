import React, { useEffect } from 'react'
import { PageHeader, Button, Form, Select, Radio } from 'antd'
import BossInput from '../components/BossInput'
import ClassSelection from '../components/ClassSelection'
import SetupSelection from '../components/SetupSelection'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { classTagState, classForSetupState, activeSetupTypeState, skillListState, toyListState } from '../states/atoms'
import Ulala from '../Models/Ulala'

const { Option } = Select

const AddSetup = () => {

  const selectedClasses = useRecoilValue(classTagState)
  const [classForSetup, setClassForSetup] = useRecoilState(classForSetupState)
  const setActiveSetupType = useSetRecoilState(activeSetupTypeState)

  const onSelect = (value) => setClassForSetup(value)
  const onChange = (e) => setActiveSetupType(e.target.value)
  
  const [skills, setSkills] = useRecoilState(skillListState)
  const [toys, setToys] = useRecoilState(toyListState)


  // Grab a list of all of the skills and toys
  useEffect(() => {
    const getSkillToyList = async () => {
      try {
        const skillList = await Ulala.SkillList()
        const toyList = await Ulala.ToyList()
        setSkills(skillList.data)
        setToys(toyList.data)
      } catch (error) {
        console.log(error)
      }
    }
    getSkillToyList()
  }, [])

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
          <BossInput context="new" />
        </Form.Item>
        <ClassSelection context="new" />
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
      <Radio.Group size="small" defaultValue="skill" buttonStyle="solid" onChange={onChange}>
        <Radio.Button style={{width: '100px'}} value="skill">Skill</Radio.Button>
        <Radio.Button style={{width: '100px'}} value="toy">Toy</Radio.Button>
      </Radio.Group>
      </div>

      <SetupSelection skills={skills} toys={toys}/>

    </div>
  )
}

export default AddSetup
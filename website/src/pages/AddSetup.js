import React, { useState, useEffect } from 'react'
import { PageHeader, Button, Form, Select, Radio, message } from 'antd'
import BossInput from '../components/BossInput'
import ClassSelection from '../components/ClassSelection'
import SetupSelection from '../components/SetupSelection'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { classTagState, classForSetupState, activeSetupTypeState, skillListState, toyListState, allSelectionsIdxState } from '../states/atoms'
import Ulala from '../Models/Ulala'

const { Option } = Select

const AddSetup = () => {

  const selectedClasses = useRecoilValue(classTagState)
  const [classForSetup, setClassForSetup] = useRecoilState(classForSetupState)
  const setActiveSetupType = useSetRecoilState(activeSetupTypeState)
  const allSelectionsIdx = useRecoilValue(allSelectionsIdxState)
  const [bossNameSelected, setBossNameSelected] = useState('')

  const onSelect = (value) => setClassForSetup(value)
  const onChange = (e) => setActiveSetupType(e.target.value)
  
  const [skills, setSkills] = useRecoilState(skillListState)
  const [toys, setToys] = useRecoilState(toyListState)

  const errorMessage = {
    selectionInvalid: 'Please make sure you have configured setups for all 4 classes.',
    bossNameEmpty: 'You have not selected a Boss for this setup.'
  }

  const updateBossInput = (value) => {
    setBossNameSelected(value)
  }

  const isSelectionValid = () => Object.keys(allSelectionsIdx).length === 4
  const isBossNameValid = () => bossNameSelected !== ''

  const isSetupValid = () => {
    if (isSelectionValid() && isBossNameValid()) {
      return true
    } else if (!isSelectionValid()) {
      message.warning({
        content: errorMessage.selectionInvalid,
        duration: 1
      })
    } else if (!isBossNameValid()) {
      message.warning({
        content: errorMessage.bossNameEmpty,
        duration: 1
      })
    }
  }

  const saveSetup = () => {
    console.log(isSetupValid())
    console.log(allSelectionsIdx)
  }

  const publishSetup = () => {
    console.log(isSetupValid())
    console.log(allSelectionsIdx)
  }

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
          <Button key="save" onClick={saveSetup}>Save</Button>,
          <Button key="publish" type="primary" onClick={publishSetup}>Publish</Button>
        ]} />

      <Form layout="vertical" style={{padding: '16px 24px 0px'}}>
        <Form.Item label="Boss">
          <BossInput context="new" updateBossInput={updateBossInput} />
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
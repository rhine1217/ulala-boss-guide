import React, { useState, useEffect } from 'react'
import { message, Skeleton } from 'antd'
import SetupSelection from '../components/SetupSelection'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { userState, classTagState, classForSetupState, skillListState, toyListState, allSelectionsIdxState } from '../states/atoms'
import Ulala from '../Models/Ulala'
import Setup from '../Models/Setup'
import SetupPageHeader from '../components/SetupPageHeader'
import SetupPageMeta from '../components/SetupPageMeta'
import SetupPageDropdown from '../components/SetupPageDropdown'
import SetupPageActiveType from '../components/SetupPageActiveType'
import SetupPageNotes from '../components/SetupPageNotes'
import { withRouter } from 'react-router'

const AddEditSetup = (props) => {

  const setupId = props.match.params.id
  const action = props.action

  const currentUser = useRecoilValue(userState)

  const [skills, setSkills] = useRecoilState(skillListState)
  const [toys, setToys] = useRecoilState(toyListState)

  const setSelectedClasses = useSetRecoilState(classTagState)
  const [classForSetup, setClassForSetup] = useRecoilState(classForSetupState)
  const allSelectionsIdx = useRecoilValue(allSelectionsIdxState)

  const [bossName, setBossName] = useState('')
  const [setupNotes, setSetupNotes] = useState('')
  const [bossSetupData, setBossSetupData] = useState(null)
  const [isSetupLoading, setIsSetupLoading] = useState(action === 'Edit' || props.location.state ? true : false)
  const [areSkillsToysLoading, setAreSkillsToysLoading] = useState(true)

  const onNoteInput = (e) => setSetupNotes(e.target.value)

  const errorMessage = {
    selectionInvalid: 'Please make sure you have configured setups for all 4 classes.',
    bossNameEmpty: 'You have not selected a Boss for this setup.'
  }

  const onBossInput = (value) => setBossName(value)

  const isSetupValid = () => {
    const isSelectionValid = () => Object.keys(allSelectionsIdx).length === 4
    const isBossNameValid = () => bossName !== ''
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

  const actionAddEditSetup = async (setupStatus) => {
    const bossSetup = {}, playerSetups = []
    if (isSetupValid()) {
      if (action === 'Add') {
        bossSetup['created_by'] = currentUser.id
        bossSetup['created_on'] = new Date()
      } else if (action === 'Edit') {
        bossSetup['id'] = setupId
      }
      bossSetup['boss'] = bossName
      bossSetup['published_on'] = setupStatus === 'P' ? new Date() : null
      bossSetup['status'] = setupStatus
      bossSetup['note'] = setupNotes
      Object.keys(allSelectionsIdx).forEach(selectionClass => {
        playerSetups.push({
          player_class: selectionClass,
          skills: allSelectionsIdx[selectionClass].skills,
          toys: allSelectionsIdx[selectionClass].toys
        })
      })
      try {
        const response = action === 'Add' ? 
                         await Setup.Add({bossSetup, playerSetups}) : 
                         await Setup.Edit(setupId, {bossSetup, playerSetups})
        console.log(response)
        if (response.status === 201 || 200) {
          if (setupStatus === 'P') {
            props.history.push(`/favourite`)
          } else if (setupStatus === 'D') {
            message.success('Setup saved!', 3)
            props.history.push(`/setup/edit/${response.data.id}/?classForSetup=${classForSetup}`)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const onSave = () => actionAddEditSetup('D')
  const onPublish = () => actionAddEditSetup('P')

  const initBossSetup = (bossSetup) => {
    setBossName(bossSetup.boss.name)
    setSelectedClasses(bossSetup['player_classes'])
    setClassForSetup(bossSetup['player_classes'][0])
    setSetupNotes(bossSetup.note)
    setBossSetupData(bossSetup['player_setup'])
  }

  useEffect(() => {
    const retrieveSetup = async () => {
      try {
        const bossSetup = await Setup.Retrieve(setupId, false)
        initBossSetup(bossSetup.data)
        setIsSetupLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    if (action === 'Edit') {
      retrieveSetup()
    } else if (props.location.state) {
      const bossSetup = props.location.state
      initBossSetup(bossSetup)
      setIsSetupLoading(false)
    }
  }, [])

  useEffect(() => {
    const getSkillToyList = async () => {
      try {
        const skillList = await Ulala.SkillList()
        const toyList = await Ulala.ToyList()
        setSkills(skillList.data)
        setToys(toyList.data)
        setAreSkillsToysLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getSkillToyList()
  }, [])

  return (
    <>
    {isSetupLoading || areSkillsToysLoading ? <div style={{paddingTop: '20%'}}><Skeleton active /></div>  :
      <>
      <SetupPageHeader action={action} onSave={onSave} onPublish={onPublish} />
      <SetupPageMeta context={action} bossName={bossName} onBossInput={onBossInput} />
      <SetupPageDropdown />
      <SetupPageActiveType />
      <SetupSelection context={props.location.state ? 'Edit' : action} skills={skills} toys={toys} bossSetupData={bossSetupData} />
      <SetupPageNotes setupNotes={setupNotes} onNoteInput={onNoteInput}/>
      </>
    }
    </>
  )
}

export default withRouter(AddEditSetup)
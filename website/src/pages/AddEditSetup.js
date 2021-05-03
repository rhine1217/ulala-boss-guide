import React, { useState, useEffect } from 'react'
import { message } from 'antd'
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

  const currUser = useRecoilValue(userState)

  const [skills, setSkills] = useRecoilState(skillListState)
  const [toys, setToys] = useRecoilState(toyListState)

  const setSelectedClasses = useSetRecoilState(classTagState)
  const [classForSetup, setClassForSetup] = useRecoilState(classForSetupState)
  const allSelectionsIdx = useRecoilValue(allSelectionsIdxState)

  const [bossName, setBossName] = useState('')
  const [setupNotes, setSetupNotes] = useState('')
  const [bossSetupData, setBossSetupData] = useState(null)
  const [isSetupLoading, setIsSetupLoading] = useState(action === 'Add' ? false : true)

  const onNoteInput = (e) => setSetupNotes(e.target.value)

  const errorMessage = {
    selectionInvalid: 'Please make sure you have configured setups for all 4 classes.',
    bossNameEmpty: 'You have not selected a Boss for this setup.'
  }

  const onBossInput = (value) => setBossName(value)

  const isSelectionValid = () => Object.keys(allSelectionsIdx).length === 4
  const isBossNameValid = () => bossName !== ''

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

  const addSetup = async (setupStatus) => {

    const bossSetup = {}, playerSetups = []

    if (isSetupValid()) {
      bossSetup['boss'] = bossName
      bossSetup['created_by'] = currUser.uid
      bossSetup['created_on'] = new Date()
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
        const response = await Setup.Add({bossSetup, playerSetups})
        if (response.status === 201) {
          props.history.push(`/setup/edit/${response.data.id}/?classForSetup=${classForSetup}`)
          window.location.reload()
        }
      } catch (error) {
        console.log(error)
      }
    }
    return { bossSetup, playerSetups }
  }

  const editSetup = async (setupStatus) => {
    console.log('placeholder')
    return
  }

  const onSave = {
    Add: () => addSetup('D'),
    Edit: () => editSetup('P')
  }

  const onPublish = {
    Add: () => addSetup('P'),
    Edit: () => editSetup('P')
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

  useEffect(() => {
    const retrieveSetup = async () => {
      try {
        const bossSetup = await Setup.Retrieve(setupId)
        setBossName(bossSetup.data.boss.name)
        setSelectedClasses(bossSetup.data['player_classes'])
        setClassForSetup(bossSetup.data['player_classes'][0])
        setSetupNotes(bossSetup.data.note)
        setBossSetupData(bossSetup.data['player_setup'])
        setIsSetupLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    if (action === 'Edit') {
      retrieveSetup()
    }
  }, [])

  return (
    <>
    {isSetupLoading ? <div>Loading</div> :
      <>
      <SetupPageHeader action={action} onSave={onSave[action]} onPublish={onPublish[action]} />
      <SetupPageMeta context={action} bossName={bossName} onBossInput={onBossInput} />
      <SetupPageDropdown />
      <SetupPageActiveType />
      <SetupSelection context={action} skills={skills} toys={toys} bossSetupData={bossSetupData} />
      <SetupPageNotes setupNotes={setupNotes} onNoteInput={onNoteInput}/>
      </>
    }
    </>
  )
}

export default withRouter(AddEditSetup)
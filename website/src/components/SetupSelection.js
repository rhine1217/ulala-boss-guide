import React, { useState, useEffect } from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { classTagState, classForSetupState, activeSetupTypeState, skillsForCurrClassState, toysForCurrClassState, currCharSelectionsState, allSelectionsState, skillToChangeIdxState, toyToChangeIdxState } from '../states/atoms'
import arrayMove from 'array-move'
import CardList from './CardList'
import SkillChoiceModal from './SkillChoiceModal'
import ToyChoiceModal from './ToyChoiceModal'
import { setSkillToyForCurrClass, getRandomSelection } from '../utils/skillToySelections'

const SetupSelection = ({context, skills, toys, bossSetupData}) => {

  const selectedClasses = useRecoilValue(classTagState)
  const classForSetup = useRecoilValue(classForSetupState)
  const activeSetupType = useRecoilValue(activeSetupTypeState)
  const setSkillsForCurrClass = useSetRecoilState(skillsForCurrClassState)
  const setToysForCurrClass = useSetRecoilState(toysForCurrClassState)
  const skillToChangeIdx = useRecoilValue(skillToChangeIdxState)
  const toyToChangeIdx = useRecoilValue(toyToChangeIdxState)
  const [currCharSelections, setCurrCharSelections] = useRecoilState(currCharSelectionsState)
  const [allSelections, setAllSelections] = useRecoilState(allSelectionsState)
  const [changeCounter, setChangeCounter] = useState(1)
  const [isRetrievedSetupLoaded, setIsRetrievedSetupLoaded] = useState(context === 'Add' ? true: false)

  const initCurrCharSelections = async (skills, toys) => {
    const {refreshedSkills, refreshedToys} = await setSkillToyForCurrClass(skills, toys, classForSetup, setSkillsForCurrClass, setToysForCurrClass)
    return {
      skills: refreshedSkills.length > 0  ? getRandomSelection(refreshedSkills) : refreshedSkills.slice(0,4),
      toys: refreshedToys.length > 0 ? getRandomSelection(refreshedToys) : refreshedToys.slice(0,4)
    }
  }

  useEffect(() => {
    const initRetrievedSetup = () => {
      if (bossSetupData) {
        const refreshedAllSelections = {}
        bossSetupData.forEach(setup => {
          refreshedAllSelections[setup['player_class']] = {
            skills: setup.skills,
            toys: setup.toys
          }
        })
        setAllSelections(refreshedAllSelections)
        setSkillToyForCurrClass(skills, toys, classForSetup, setSkillsForCurrClass, setToysForCurrClass)
        const currCharSetup = bossSetupData.filter(setup => setup['player_class'] === classForSetup)
        setCurrCharSelections({
          skills: currCharSetup[0].skills,
          toys: currCharSetup[0].toys
        })
      } 
      setIsRetrievedSetupLoaded(true)
    }
    initRetrievedSetup()
  }, [])

  useEffect(() => {
    if (isRetrievedSetupLoaded) {
      const refreshedAllSelections = { ...allSelections }
      if (classForSetup) {
        refreshedAllSelections[classForSetup] = currCharSelections
      }
      Object.keys(refreshedAllSelections).forEach(key => {
        if (!(selectedClasses.includes(key))) {
          delete refreshedAllSelections[key]
        }
      })
      setAllSelections(refreshedAllSelections)  
    }
  }, [changeCounter, selectedClasses.length, skillToChangeIdx, toyToChangeIdx]) 
  // when sorting happens, when class tags change (select/unselect classes from the tags), when a new skill gets swapped in, when a new toy gets swapped in

  useEffect(() => {
    const updateCurrCharSelections = async () => {
      if (allSelections[classForSetup]) {
        setCurrCharSelections(allSelections[classForSetup])
      } else {
        setCurrCharSelections(await initCurrCharSelections(skills, toys))
        setChangeCounter(changeCounter * -1)
      }
    }
    if (isRetrievedSetupLoaded) {
      updateCurrCharSelections()
    }
  }, [classForSetup])

  const onSortEnd = ({oldIndex, newIndex}) => {
    setCurrCharSelections( selections => {
      return {
        skills: activeSetupType === 'skill' ? arrayMove(selections.skills, oldIndex, newIndex) : selections.skills,
        toys: activeSetupType === 'toy' ? arrayMove(selections.toys, oldIndex, newIndex) : selections.toys,
      }
    })
    setChangeCounter(changeCounter * -1)
  }

  return (
    <>
    { currCharSelections && currCharSelections.hasOwnProperty('skills') && currCharSelections.hasOwnProperty('toys') &&
      <CardList activeClass={classForSetup} skills={currCharSelections.skills} toys={currCharSelections.toys} onSortEnd={onSortEnd}></CardList>
    }
    <SkillChoiceModal />
    <ToyChoiceModal />
    </>
  )

}

export default SetupSelection
import React, { useState, useEffect } from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { classTagState, classForSetupState, activeSetupTypeState, skillsForCurrClassState, toysForCurrClassState, currCharSelectionsState } from '../states/atoms'
import arrayMove from 'array-move'
import CardList from './CardList'
import ChoiceModal from './ChoiceModal'

const SetupSelection = ({skills, toys}) => {
  // has full list of skills & toys passed down as props.

  const selectedClasses = useRecoilValue(classTagState)
  const classForSetup = useRecoilValue(classForSetupState)
  const activeSetupType = useRecoilValue(activeSetupTypeState)
  const setSkillsForCurrClass = useSetRecoilState(skillsForCurrClassState)
  const setToysForCurrClass = useSetRecoilState(toysForCurrClassState)
  const [changeCounter, setChangeCounter] = useState(1)
  const [currCharSelections, setCurrCharSelections] = useRecoilState(currCharSelectionsState)
  // {
  //   skills: []
  //   toys: []
  // }
  const [allSelections, setAllSelections] = useState({})
  // {
  //   Warrior: 
  //     skills: [],
  //     toys: [],
  // }

  const initCurrCharSelections = (skills, toys) => {
    let refreshedSkills = [], refreshedToys = []
    if (skills.length > 0) {
      const skillsForCurrClass = skills.filter(skill => skill['related_class'] === classForSetup)
      refreshedSkills = skillsForCurrClass
      setSkillsForCurrClass(refreshedSkills)
    }
    if (toys.length > 0) {
      const toysForCurrClass = toys.filter(toy => toy.name === classForSetup)
      if (toysForCurrClass.length > 0) {
        refreshedToys = toysForCurrClass[0]['toy_list']
        setToysForCurrClass(refreshedToys)
      }
    }
    return {
      skills: refreshedSkills.slice(0,4),
      toys: refreshedToys.slice(0,4)
    }
  }

  useEffect(() => {
    if (allSelections[classForSetup]) {
      setCurrCharSelections(allSelections[classForSetup])
    } else {
      setCurrCharSelections(initCurrCharSelections(skills, toys))
      setChangeCounter( changeCounter * -1 )
    }
  }, [classForSetup])

  useEffect(() => {

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

  }, [changeCounter, selectedClasses.length]) // when sorting happens * when class tags change (select/unselect classes from the tags)


  const onSortEnd = ({oldIndex, newIndex}) => {

    setCurrCharSelections( selections => {
      return {
        skills: activeSetupType === 'skill' ? arrayMove(selections.skills, oldIndex, newIndex) : selections.skills,
        toys: activeSetupType === 'toy' ? arrayMove(selections.toys, oldIndex, newIndex) : selections.toys,
      }
    })
    setChangeCounter( changeCounter * -1 )
  }

  return (
    <>
    { currCharSelections && currCharSelections.hasOwnProperty('skills') && currCharSelections.hasOwnProperty('toys') &&
      <CardList activeClass={classForSetup} skills={currCharSelections.skills} toys={currCharSelections.toys} onSortEnd={onSortEnd}></CardList>
    }
    <ChoiceModal />
    </>
  )

}

export default SetupSelection
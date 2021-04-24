import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { classTagState, classForSetupState, activeSetupTypeState } from '../states/atoms'
import arrayMove from 'array-move'
import CardList from './CardList'


const SetupSelection = ({skills, toys}) => {
  // has full list of skills & toys passed down as props.

  const selectedClasses = useRecoilValue(classTagState)
  const classForSetup = useRecoilValue(classForSetupState)
  const activeSetupType = useRecoilValue(activeSetupTypeState)
  const [changeCounter, setChangeCounter] = useState(0)
  const [currCharSelections, setCurrCharSelections] = useState({})
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
      refreshedSkills = skillsForCurrClass.slice(0,4)
    }
    if (toys.length > 0) {
      const toysForCurrClass = toys.filter(toy => toy.name === classForSetup)
      if (toysForCurrClass.length > 0) {
        refreshedToys = toysForCurrClass[0]['toy_list'].slice(0,4)
      }
    }
    return {
      skills: refreshedSkills,
      toys: refreshedToys
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
      <CardList skills={currCharSelections.skills} toys={currCharSelections.toys} onSortEnd={onSortEnd}></CardList>
    }
    </>
  )

}

export default SetupSelection
import { atom, selector } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: null,
})

export const classTagState = atom({
  key: 'classTagState',
  default: [] // an array of classes 
})

export const classForSetupState = atom({
  key: 'classForSetupState',
  default: '' // e.g. 'Warrior'
})

export const activeSetupTypeState = atom({
  key: 'activeSetupTypeState',
  default: 'skill' // 'skill' or 'toy'
})

export const skillListState = atom({
  key: 'skillListState',
  default: [] // an array of all of the skills
})

export const toyListState = atom({
  key: 'toyListState',
  default: [] // an array of all of the toys
})

export const skillsForCurrClassState = atom({
  key: 'skillsForCurrClassState',
  default: [] // an array of the currently selected class's skills
})

export const toysForCurrClassState = atom({
  key: 'toysForCurrClassState',
  default: [] // an array of the currently selected class's toys
})

export const currCharSelectionsState = atom({
  key: 'currCharSelectionsState',
  default: {} // {skills: [], toys: []}
})

export const allSelectionsState = atom({
  key: 'allSelectionsState',
  default: {}
})

export const allSelectionsIdxState = selector({
  key: 'allSelectionsIdxState',
  get:({get}) => {
    const allSelectionsIdx = {}
    const allSelections = get(allSelectionsState)
    const allClasses = Object.keys(allSelections)
    if (allClasses.length > 0) {
      allClasses.forEach(charClass => {
        allSelectionsIdx[charClass] = {
          skills: allSelections[charClass].skills.map(skill => skill.id),
          toys: allSelections[charClass].toys.map(toy => toy.id)
        }
      })
    }
    return allSelectionsIdx
  }
})

export const skillsSelectedIdxState = selector({
  key: 'skillsSelectedIdxState',
  get: ({get}) => {
    const skillsSelected = get(currCharSelectionsState)
    if (skillsSelected.hasOwnProperty('skills')) {
      return skillsSelected.skills.map(skill => skill.id)
    } else {
      return []
    }
  }
})

export const toysToSelectFromState = selector({
  key: 'toysToSelectFromState',
  get: ({get}) => {
    const toysSelected = get(currCharSelectionsState)
    const toysForCurrClass = get(toysForCurrClassState)
    if (toysSelected.hasOwnProperty('toys')) {
      const toysSelectedIdx = toysSelected.toys.map(toy => toy.id)
      return toysForCurrClass.filter(toy => toysSelectedIdx.includes(toy.id) === false)
    } else {
      return toysForCurrClass
    }
  }
})

export const isSkillChoiceModalVisibleState = atom({
  key: 'isSkillChoiceModalVisibleState',
  default: false
})

export const isSkillDetailModalVisibleState = atom({
  key: 'isSkillDetailModalVisibleState',
  default: false
})

export const skillForDetailsState = atom({
  key: 'skillForDetailsState',
  default: {}
})

export const skillToChangeIdxState = atom({
  key: 'skillToChangeIdxState', 
  default: -1
})

export const isToyChoiceModalVisibleState = atom({
  key: 'isToyChoiceModalVisibleState',
  default: false
})

export const isToyDetailModalVisibleState = atom({
  key: 'isToyDetailModalVisibleState',
  default: false
})

export const toyForDetailsState = atom({
  key: 'toyForDetailsState',
  default: {}
})

export const toyToChangeIdxState = atom({
  key: 'toyToChangeIdxState', 
  default: -1
})
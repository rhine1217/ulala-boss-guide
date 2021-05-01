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

export const skillsSelectedIdxState = selector({
  key: 'skillsSelectedIdxState',
  get: ({get}) => {
    const skillsSelected = get(currCharSelectionsState)
    console.log('inside Selector', skillsSelected)
    if (skillsSelected.hasOwnProperty('skills')) {
      return skillsSelected.skills.map(skill => skill.id)
    } else {
      return []
    }
  }
})

export const isChoiceModalVisibleState = atom({
  key: 'isChoiceModalVisibleState',
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
import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: null,
})

export const classTagState = atom({
  key: 'classTagState',
  default: []
})

export const classForSetupState = atom({
  key: 'classForSetupState',
  default: ''
})

export const activeSetupTypeState = atom({
  key: 'activeSetupTypeState',
  default: 'skill'
})

export const skillListState = atom({
  key: 'skillListState',
  default: []
})

export const toyListState = atom({
  key: 'toyListState',
  default: []
})

export const skillsForCurrClassState = atom({
  key: 'skillsForCurrClassState',
  default: []
})

export const toysForCurrClassState = atom({
  key: 'toysForCurrClassState',
  default: []
})

export const currCharSelectionsState = atom({
  key: 'currCharSelectionsState',
  default: {}
})

export const isChoiceModalVisibleState = atom({
  key: 'isChoiceModalVisibleState',
  default: false
})
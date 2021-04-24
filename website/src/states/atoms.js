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
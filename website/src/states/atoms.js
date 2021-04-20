import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: null,
})

export const classTagState = atom({
  key: 'classTagState',
  default: []
})

export const classTagsColorState = atom({
  key: 'classTagsColorState',
  default: {
    Mage: 'blue',
    Warlock: 'purple',
    Hunter: 'orange',
    Assassin: 'volcano',
    Shaman: 'cyan',
    Druid: 'green',
    Warrior: 'red',
    Gladiator: 'error'
  }
})

export const classForSetupState = atom({
  key: 'classForSetupState',
  default: ''
})
export const classTagsColor = {
  Mage: 'blue',
  Warlock: 'purple',
  Hunter: 'orange',
  Assassin: 'volcano',
  Shaman: 'cyan',
  Druid: 'green',
  Warrior: 'red',
  Gladiator: 'error'
}

export const classImgPrefix = {
  Mage: 'FS',
  Warlock: 'SS',
  Hunter: 'LR',
  Assassin: 'DZ',
  Shaman: 'SM',
  Druid: 'DLY',
  Warrior: 'ZS',
  Gladiator: 'DS'
}

export const setSkillToyForCurrClass = async (
  skills, toys, 
  classForSetup, 
  setSkillsForCurrClass, 
  setToysForCurrClass
) => {
  let refreshedSkills = [], refreshedToys = []
  if (skills.length > 0) {
    const skillsForCurrClass = skills.filter(skill => skill['related_class'] === classForSetup)
    refreshedSkills = skillsForCurrClass
    await setSkillsForCurrClass(refreshedSkills)
  }
  if (toys.length > 0) {
    const toysForCurrClass = toys.filter(toy => toy.name === classForSetup)
    if (toysForCurrClass.length > 0) {
      refreshedToys = toysForCurrClass[0]['toy_list']
      await setToysForCurrClass(refreshedToys)
    }
  }
  return {refreshedSkills, refreshedToys}
}

export const getRandomSelection = (selection) => {
  const randomIdx = new Set()
  const output = [...Array(4)].map(() => {
    const size = randomIdx.size
    let generatedIdx = -1
    while (size === randomIdx.size) {
      generatedIdx = Math.floor(Math.random() * selection.length)
      randomIdx.add(generatedIdx)
    }
    return selection[generatedIdx]
  })
  return output
}
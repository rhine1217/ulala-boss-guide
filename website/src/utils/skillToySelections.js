export const getSkillToyForCurrClass = (skills, toys, classForSetup) => {
  let refreshedSkills = [], refreshedToys = []
  if (skills.length > 0) {
    const skillsForCurrClass = skills.filter(skill => skill['related_class'] === classForSetup)
    refreshedSkills = skillsForCurrClass
  }
  if (toys.length > 0) {
    const toysForCurrClass = toys.filter(toy => toy.name === classForSetup)
    if (toysForCurrClass.length > 0) {
      refreshedToys = toysForCurrClass[0]['toy_list']
    }
  }
  return {refreshedSkills, refreshedToys}
}

export const skillToyValidation = (generatedItems, newItem) => {
  return generatedItems.every(item => item.name !== newItem['not_allowed_with'])
}

export const getRandomSelection = (selection) => {
  const randomIdx = new Set()
  const output = []
  for (let i = 0; i < 4; i++) {
    const size = randomIdx.size
    let generatedIdx = -1, isItemValid = false
    while (size === randomIdx.size || !isItemValid) {
      generatedIdx = Math.floor(Math.random() * selection.length)
      isItemValid = skillToyValidation(output, selection[generatedIdx])
      if (isItemValid) {
        randomIdx.add(generatedIdx)
      }
    }
    output.push(selection[generatedIdx])
  }
  return output
}
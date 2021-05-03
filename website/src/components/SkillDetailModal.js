import React from 'react'
import { Modal, Button, message } from 'antd'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isSkillChoiceModalVisibleState, isSkillDetailModalVisibleState, skillToChangeIdxState, currCharSelectionsState } from '../states/atoms'
import { skillToyValidation } from '../utils/skillToySelections'

const SkillDetailModal = ({skill}) => {

  const [isSkillDetailModalVisible, setIsSkillDetailModalVisible] = useRecoilState(isSkillDetailModalVisibleState)
  const [skillToChangeIdx, setSkillToChangeIdx] = useRecoilState(skillToChangeIdxState)
  const [currCharSelections, setCurrCharSelections] = useRecoilState(currCharSelectionsState)
  const setIsSkillChoiceModalVisible = useSetRecoilState(isSkillChoiceModalVisibleState)

  const updateSkill = (newSkill) => {
    const otherSkills = currCharSelections.skills.filter((skill, idx) => idx !== skillToChangeIdx)
    if (skillToyValidation(otherSkills, newSkill)) {
      setIsSkillDetailModalVisible(false)
      const refreshedCurrCharSelectionsSkills = [ ...currCharSelections.skills ]
      refreshedCurrCharSelectionsSkills[skillToChangeIdx] = newSkill
      setCurrCharSelections(selections => {
        return {
          skills: refreshedCurrCharSelectionsSkills,
          toys: selections.toys
        }
      })
      setIsSkillChoiceModalVisible(false)
      setSkillToChangeIdx(-1)
    } else {
      const baseSkillName = newSkill.name.split('II')[0]
      message.warning({
        content: `Can only equip one type of ${baseSkillName} skill at one time`,
        duration: 1
      })
    }
  }

  const footer = skillToChangeIdx === -1 ? null : 
        <Button key="swap" type="primary" onClick={() => updateSkill(skill)}>Swap</Button>

  return (
    <Modal
      title={skill.name}
      centered
      visible={isSkillDetailModalVisible}
      footer={footer}
      onCancel={() => setIsSkillDetailModalVisible(false)}
      width={300}
    >
      <div>{skill.description}</div>
    </Modal>
  )

}

export default SkillDetailModal
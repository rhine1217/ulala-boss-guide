import React from 'react'
import { Modal, Button } from 'antd'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isSkillChoiceModalVisibleState, isSkillDetailModalVisibleState, skillToChangeIdxState, currCharSelectionsState } from '../states/atoms'

const SkillDetailModal = ({skill}) => {

  const [isSkillDetailModalVisible, setIsSkillDetailModalVisible] = useRecoilState(isSkillDetailModalVisibleState)
  const [skillToChangeIdx, setSkillToChangeIdx] = useRecoilState(skillToChangeIdxState)
  const [currCharSelections, setCurrCharSelections] = useRecoilState(currCharSelectionsState)
  const setIsSkillChoiceModalVisible = useSetRecoilState(isSkillChoiceModalVisibleState)
  
  const updateSkill = () => {

    setIsSkillDetailModalVisible(false)
    const refreshedCurrCharSelectionsSkills = [ ...currCharSelections.skills ]
    refreshedCurrCharSelectionsSkills[skillToChangeIdx] = skill
    setCurrCharSelections(selections => {
      return {
        skills: refreshedCurrCharSelectionsSkills,
        toys: selections.toys
      }
    })

    setSkillToChangeIdx(-1)
    setIsSkillChoiceModalVisible(false)
  }

  const footer = skillToChangeIdx === -1 ? null : 
        <Button key="swap" type="primary" onClick={updateSkill}>Swap</Button>

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
import React from 'react'
import { Modal, Button } from 'antd'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isChoiceModalVisibleState, isSkillDetailModalVisibleState, skillToChangeIdxState, currCharSelectionsState } from '../states/atoms'

const SkillDetailModal = ({skill}) => {

  const [isSkillDetailModalVisible, setIsSkillDetailModalVisible] = useRecoilState(isSkillDetailModalVisibleState)
  const [skillToChangeIdx, setSkillToChangeIdx] = useRecoilState(skillToChangeIdxState)
  const [currCharSelections, setCurrCharSelections] = useRecoilState(currCharSelectionsState)
  const setIsChoiceModalVisible = useSetRecoilState(isChoiceModalVisibleState)

  const updateSkill = () => {
    setIsSkillDetailModalVisible(false)
    const refreshedCurrCharSelectionsSkills = [ ... currCharSelections.skills ]
    refreshedCurrCharSelectionsSkills[skillToChangeIdx] = skill
    setCurrCharSelections(selections => {
      return {
        skills: refreshedCurrCharSelectionsSkills,
        toys: selections.toys
      }
    })
    setSkillToChangeIdx(-1)
    setIsChoiceModalVisible(false)
  }

  return (
    <Modal
      title={skill.name}
      centered
      visible={isSkillDetailModalVisible}
      footer={
        <Button key="swap" type="primary" onClick={updateSkill}>
          Swap
        </Button>
      }
      onCancel={() => setIsSkillDetailModalVisible(false)}
      width={300}
    >
      <div>{skill.description}</div>
    </Modal>
  )


}

export default SkillDetailModal
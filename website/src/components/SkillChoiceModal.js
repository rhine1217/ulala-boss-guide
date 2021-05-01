import React from 'react'
import { Modal } from 'antd'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { classForSetupState, skillsForCurrClassState, isSkillChoiceModalVisibleState, skillToChangeIdxState } from '../states/atoms'
import SkillIcon from './SkillIcon'
import styles from './SkillChoiceModal.module.css'

const SkillChoiceModal = () => {

  const [isSkillChoiceModalVisible, setIsSkillChoiceModalVisible] = useRecoilState(isSkillChoiceModalVisibleState)
  const skillsForCurrClass = useRecoilValue(skillsForCurrClassState)
  const classForSetup = useRecoilValue(classForSetupState)
  const setSkillToChangeIdx = useSetRecoilState(skillToChangeIdxState)

  const onCancel = () => {
    setIsSkillChoiceModalVisible(false)
    setSkillToChangeIdx(-1)
  }

  return (
    <>
    <Modal
      title="Select following skills to swap"
      centered
      visible={isSkillChoiceModalVisible}
      footer={null}
      onCancel={onCancel}
    >
      <div className={styles['choice-wrapper']}>
        {skillsForCurrClass.map((skillForCurrClass, idx) => (
          <SkillIcon key={idx} activeClass={classForSetup} skill={skillForCurrClass} context='choiceModal' />
        ))}
      </div>
    </Modal>
    </>
  )

}

export default SkillChoiceModal
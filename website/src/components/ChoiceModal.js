import React, { useState } from 'react'
import { Modal, Row, Col } from 'antd'
import { useRecoilValue, useRecoilState } from 'recoil'
import { classForSetupState, activeSetupTypeState, skillsForCurrClassState, toysForCurrClassState, currCharSelectionsState, isChoiceModalVisibleState } from '../states/atoms'
import SetupIcons from './SetupIcons'
import styles from './ChoiceModal.module.css'

const ChoiceModal = () => {

  const activeSetupType = useRecoilValue(activeSetupTypeState)
  const [isChoiceModalVisible, setIsChoiceModalVisible] = useRecoilState(isChoiceModalVisibleState)
  const skillsForCurrClass = useRecoilValue(skillsForCurrClassState)
  const classForSetup = useRecoilValue(classForSetupState)

  // modal choices = all current Class stuff, minus anything in currently selected.
  return (
    <Modal
      title="Select following skills to swap"
      centered
      visible={isChoiceModalVisible}
      footer={null}
      onCancel={() => setIsChoiceModalVisible(false)}
    >
      <div className={styles['choice-wrapper']}>
      {skillsForCurrClass.map((skillForCurrClass, idx) => (
        <SetupIcons.Skill key={idx} activeClass={classForSetup} skill={skillForCurrClass} context='choiceModal' />
      ))}
        </div>
    </Modal>
  )

}

export default ChoiceModal
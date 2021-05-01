import React from 'react'
import { Modal, Button } from 'antd'
import { useRecoilState } from 'recoil'
import { isSkillDetailModalVisibleState } from '../states/atoms'

const SkillDetailModal = ({skill}) => {

  const [isSkillDetailModalVisible, setIsSkillDetailModalVisible] = useRecoilState(isSkillDetailModalVisibleState)
  const updateSkill = () => {
    console.log('clicked')
    setIsSkillDetailModalVisible(false)
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
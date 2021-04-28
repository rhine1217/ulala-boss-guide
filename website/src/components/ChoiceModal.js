import React from 'react'
import { Modal } from 'antd'
import { useRecoilValue } from 'recoil'
import { activeSetupTypeState, skillsForCurrClassState, toysForCurrClassState, currCharSelectionsState } from '../states/atoms'

const ChoiceModal = () => {


  const activeSetupType = useRecoilValue(activeSetupTypeState)

  }
  // modal choices = all current Class stuff, minus anything in currently selected.
  return (
    <Modal
      title="Select following skills to swap"
      centered
      visible={visible}
    >
      <div>Some contents stuff</div>
      <div>Some contents stuff</div>
      <div>Some contents stuff</div>
    </Modal>
  )

}

export default ChoiceModal
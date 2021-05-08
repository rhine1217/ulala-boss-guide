import React from 'react'
import { Modal } from 'antd'
import { useRecoilState } from 'recoil'
import { isToyDetailModalVisibleState } from '../states/atoms'
import ToyDesc from './ToyDesc'

const ToyDetailModal = ({toy}) => {
  const [isToyDetailModalVisible, setIsToyDetailModalVisible] = useRecoilState(isToyDetailModalVisibleState)
  return (
    <Modal 
      title={toy.name} 
      centered 
      visible={isToyDetailModalVisible} 
      footer={null} 
      maskStyle={{backgroundColor: 'transparent'}}
      onCancel={(e) => {e.stopPropagation(); setIsToyDetailModalVisible(false)}} width={300}>
      <ToyDesc description={toy.description} />
    </Modal> 
  )
}

export default ToyDetailModal
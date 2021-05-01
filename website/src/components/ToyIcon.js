import React, { useState } from 'react'
import styles from './ToyIcon.module.css'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isToyChoiceModalVisibleState, toyToChangeIdxState } from '../states/atoms'
import { Modal } from 'antd'

const ToyIcon = ({toy, context}) => {

  const setIsToyChoiceModalVisible = useSetRecoilState(isToyChoiceModalVisibleState)
  const [toyToChangeIdx, setToyToChangeIdx] = useRecoilState(toyToChangeIdxState) 
  const [isToyDetailModalVisible, setIsToyDetailModalVisible] = useState(false)

  const onClickToy = () => {
    if (context === 'choiceModal') {
      return
    } else if (context.split('-')[0] === 'toy') {
      setToyToChangeIdx(parseInt(context.split('-')[1]))
      setIsToyChoiceModalVisible(true)
    } else if (context.split('-')[0] === 'skill') {
      setIsToyDetailModalVisible(true)
    } else if (context === 'searchResult') {
      setIsToyDetailModalVisible(true)
    }
  }

  return (
    <>
    <div>
      <button className={styles['toy-icon-button']} onClick={onClickToy} />
      <div className={styles['toy-icon-wrapper']}>
        <img className={styles['toy-img']} src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/${toy['img_url']}.png`} alt="toy" />
      </div>
    </div>
    {toyToChangeIdx === -1 ? <Modal title={toy.name} centered visible={isToyDetailModalVisible} footer={null} onCancel={() => setIsToyDetailModalVisible(false)} width={300}>{toy.description}</Modal> : <></>}
    </>
  )
}

export default ToyIcon
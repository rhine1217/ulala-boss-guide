import React, { useState } from 'react'
import styles from './ToyIcon.module.css'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { isToyChoiceModalVisibleState, toyToChangeIdxState } from '../states/atoms'
import { Modal } from 'antd'
import ToyDesc from './ToyDesc'

const ToyIcon = ({toy, context}) => {

  const setIsToyChoiceModalVisible = useSetRecoilState(isToyChoiceModalVisibleState)
  const [toyToChangeIdx, setToyToChangeIdx] = useRecoilState(toyToChangeIdxState) 
  const [isToyDetailModalVisible, setIsToyDetailModalVisible] = useState(false)

  const onClickToy = () => {
    let currContext = context.split('-')[0] || context
    switch (currContext) {
      case 'choiceModal':
        return
      case 'toy':
        setToyToChangeIdx(parseInt(context.split('-')[1]))
        setIsToyChoiceModalVisible(true)
        break;
      case 'skill':
        setIsToyDetailModalVisible(true)
        break;
      case 'searchResult':
        setIsToyDetailModalVisible(true)
    }
  }

  const subText = () => {
    let currContext = context.split('-')[0] || context
    console.log(currContext)
    return (currContext === 'skill' ? <div className={styles['toy-name-subtext']}>{toy.name}</div> 
    : <></> )
  }

  return (
    <>
    <div>
      <button className={styles['toy-icon-button']} onClick={onClickToy} />
      <div className={styles['toy-icon-wrapper']}>
        <img className={styles['toy-img']} src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/${toy['img_url']}.png`} alt="toy" />
      {subText()}
      </div>
    </div>
    {toyToChangeIdx === -1 ? 
      <Modal title={toy.name} centered visible={isToyDetailModalVisible} footer={null} onCancel={() => setIsToyDetailModalVisible(false)} width={300}>
      <ToyDesc description={toy.description} />
      </Modal> 
      : <></>}
    </>
  )
}

export default ToyIcon
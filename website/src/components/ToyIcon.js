import React from 'react'
import styles from './ToyIcon.module.css'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isToyChoiceModalVisibleState, toyToChangeIdxState, isToyDetailModalVisibleState, toyForDetailsState } from '../states/atoms'
import ToyDetailModal from './ToyDetailModal'

const ToyIcon = ({toy, context}) => {

  const setIsToyChoiceModalVisible = useSetRecoilState(isToyChoiceModalVisibleState)
  const setIsToyDetailModalVisible = useSetRecoilState(isToyDetailModalVisibleState)
  const setToyToChangeIdx = useSetRecoilState(toyToChangeIdxState) 
  const [toyForDetails, setToyForDetails] = useRecoilState(toyForDetailsState)

  const onClickToy = (toy) => {
    let currContext = context.split('-')[0] || context
    switch (currContext) {
      case 'choiceModal':
        return
      case 'toy':
        setToyToChangeIdx(parseInt(context.split('-')[1]))
        setIsToyChoiceModalVisible(true)
        break;
      case 'skill':
        setToyForDetails(toy)
        setIsToyDetailModalVisible(true)
        break;
      case 'searchResult':
        setToyForDetails(toy)
        setIsToyDetailModalVisible(true)
        break;
      default:
        return 
    }
  }

  const subText = () => {
    let currContext = context.split('-')[0] || context
    return (currContext === 'skill' ? <div className={styles['toy-name-subtext']}>{toy.name}</div> 
    : <></> )
  }

  return (
    <>
    <div>
      <button className={styles['toy-icon-button']} onClick={() => onClickToy(toy)} />
      <div className={styles['toy-icon-wrapper']}>
        <img className={styles['toy-img']} src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/${toy['img_url']}.png`} alt="toy" />
      {subText()}
      </div>
    </div>
    {Object.keys(toyForDetails).length === 0 || toyForDetails.id !== toy.id ? <></> : <ToyDetailModal toy={toyForDetails} /> }
    </>
  )
}

export default ToyIcon
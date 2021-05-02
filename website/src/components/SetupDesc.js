import React, { useState, useEffect } from 'react'
import { Tag } from 'antd'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { classTagsColor } from '../utils/charClassUtils'
import { classForSetupState, isSkillDetailModalVisibleState, isToyDetailModalVisibleState, skillForDetailsState, toyForDetailsState } from '../states/atoms'
import ToyDesc from './ToyDesc'
import styles from './SetupDesc.module.css'

const SetupDesc = ({value, context}) => {
  
  const classForSetup = useRecoilValue(classForSetupState)
  const setSkillForDetails = useSetRecoilState(skillForDetailsState)
  const setIsSkillDetailModalVisible = useSetRecoilState(isSkillDetailModalVisibleState)
  const setToyForDetails = useSetRecoilState(toyForDetailsState)
  const setIsToyDetailModalVisible = useSetRecoilState(isToyDetailModalVisibleState)
  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)

  const containerRef = React.createRef()

  const description = value.description
  const currContext = context.split('-')[0] || context

  useEffect(() => {
    const setDimensions = () => {
      setContainerWidth(containerRef.current.offsetWidth)
      setContainerHeight(containerRef.current.offsetHeight)
    }
    if (containerRef.current) {
      setDimensions()
    }
    window.addEventListener("resize", setDimensions)
    return () => {
      window.removeEventListener("resize", setDimensions)
    }
  }, [containerRef])

  const onClickDesc = () => {
    switch (currContext) {
      case 'choiceModal':
        return 
      case 'skill':
        setSkillForDetails(value)
        setIsSkillDetailModalVisible(true)
        break;
      case 'toy':
        setToyForDetails(value)
        setIsToyDetailModalVisible(true)
        break;
      default:
        return
    }
  }

  return (
    <>
    <div ref={containerRef} style={{paddingLeft: '16px', width: '100%'}}>
      <button className={styles['setup-desc-button']} style={{width: containerWidth, height: containerHeight, cursor: currContext === 'choiceModal' ? 'default' : 'pointer'}} onClick={onClickDesc} />
      <Tag color={classTagsColor[classForSetup]}>{value.name}</Tag>
      <div className={context === 'choiceModal' ? '' : "text-overflow"} style={{fontSize: '12px', paddingTop: '8px', minHeight: '4em'}}>
        {typeof description === 'string' ? description : 
        <ToyDesc description={description} />
        }
      </div>
    </div>
    </>
  )

}

export default SetupDesc
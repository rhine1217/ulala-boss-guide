import React from 'react'
import { classImgPrefix } from '../utils/charClassUtils'
import styles from './SkillIcon.module.css'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { isSkillChoiceModalVisibleState, isSkillDetailModalVisibleState, skillsSelectedIdxState, skillForDetailsState, skillToChangeIdxState } from '../states/atoms'
import SkillDetailModal from './SkillDetailModal'

const SkillIcon = ({activeClass, skill, context}) => {

  const setIsSkillChoiceModalVisible = useSetRecoilState(isSkillChoiceModalVisibleState)
  const setIsSkillDetailModalVisible = useSetRecoilState(isSkillDetailModalVisibleState)
  const [skillForDetails, setSkillForDetails] = useRecoilState(skillForDetailsState)
  const setSkillToChangeIdx = useSetRecoilState(skillToChangeIdxState)
  const skillsSelectedIdx = useRecoilValue(skillsSelectedIdxState)

  const currContext = context.split('-')[0] || context

  const onClickSkill = (e) => {
    e.stopPropagation()
    switch (currContext) {
      case 'choiceModal':
        setSkillForDetails(skill)
        setIsSkillDetailModalVisible(true)
        break;
      case 'skill':
        setSkillToChangeIdx(parseInt(context.split('-')[1]))
        setIsSkillChoiceModalVisible(true)
        break;
      case 'toy':
        setSkillForDetails(skill)
        setIsSkillDetailModalVisible(true)
        break;
      case 'result':
        setSkillForDetails(skill)
        setIsSkillDetailModalVisible(true)
        break;
      default:
        return
    }
  }

  const subText = () => {
    switch (currContext) {
      case 'choiceModal':
        return (<></>)
      case 'skill':
        return (<div className={styles['skill-energy-type-text']}>{skill['energy_type']}</div>)
      case 'toy':
        return (<div className={styles['skill-name-subtext']}>{skill.name}</div>)
      default:
        return (<></>)
    }
  }

  return (
    <>
    <div>
      <button className={styles['skill-icon-button']} onClick={(e) => onClickSkill(e)} />
      <div className={styles['skill-icon-wrapper']}>
        <div className={styles['skill-energy-wrapper']}>
          <img
            className={styles['skill-energy-img']} 
            src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/cast+%23360820.png`}
            alt="Energy Icon" />
          <div className={styles['skill-energy-text']}>{skill.energy}</div>
        </div>
        <div className={styles['skill-img-wrapper']}>
          <img 
            className={styles['skill-img-border']} 
            src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/10.png`}
            alt="Skill Border" />
          <img 
            className={styles['skill-img']}
            src={ activeClass ? `${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/${classImgPrefix[activeClass]}_${skill['img_url']}.png` : ''}
            alt="Character Skill" />
          {skill.name.includes('II') ?
          <img 
            className={styles['skill-up']}
            src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/TxtPetUp.png`} 
            alt="Skill Up" /> : <></> }
          {context === 'choiceModal' && skillsSelectedIdx.includes(skill.id) ? 
            <div className={styles['skill-equip']}>Equip</div> : <></> }
        </div>
        {subText()}
      </div>
    </div>
    {Object.keys(skillForDetails).length === 0 || skillForDetails.id !== skill.id ? <></> : <SkillDetailModal skill={skillForDetails}/>}
    </>
  )
}

export default SkillIcon
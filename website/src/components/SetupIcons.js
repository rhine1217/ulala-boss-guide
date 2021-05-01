import React, { useEffect } from 'react'
import { classImgPrefix } from '../utils/charClassUtils'
import styles from './SetupIcons.module.css'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { isChoiceModalVisibleState, isSkillDetailModalVisibleState, skillsSelectedIdxState, skillForDetailsState } from '../states/atoms'

const Skill = ({activeClass, skill, context}) => {

  const setIsChoiceModalVisible = useSetRecoilState(isChoiceModalVisibleState)
  const setIsSkillDetailModalVisible = useSetRecoilState(isSkillDetailModalVisibleState)
  const setSkillForDetails = useSetRecoilState(skillForDetailsState)
  const skillsSelectedIdx = useRecoilValue(skillsSelectedIdxState)

  const onClickSkill = (e) => {

    if (context === 'choiceModal') {
      setSkillForDetails(skill)
      setIsSkillDetailModalVisible(true)
    } else {
      setIsChoiceModalVisible(true)
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
            src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/${classImgPrefix[activeClass]}_${skill['img_url']}.png`}
            alt="Character Skill" />
          {skill.name.includes('II') ?
          <img 
            className={styles['skill-up']}
            src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/TxtPetUp.png`} 
            alt="Skill Up" /> : <></> }
          {context === 'choiceModal' && skillsSelectedIdx.includes(skill.id) ? 
            <div className={styles['skill-equip']}>Equip</div> : <></> }
        </div>
        {context === 'choiceModal' ? <></> : 
        <div className={styles['skill-energy-type-text']}>{skill['energy_type']}</div> }
      </div>
    </div>
    </>
  )
}

const Toy = ({toy, context}) => {

  const onClickToy = (toy) => {
    console.log(context)
    console.log(toy)
  }

  return (
    <div className={styles['toy-icon-wrapper']} onClick={() => onClickToy(toy)}>
      <img className={styles['toy-img']} src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/${toy['img_url']}.png`} alt="toy" />
    </div>
  )
}

const SetupIcons = {
  Skill,
  Toy
}

export default SetupIcons
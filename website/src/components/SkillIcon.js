import React from 'react'
import { classImgPrefix } from '../utils/charClassUtils'
import styles from './SkillIcon.module.css'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { isSkillChoiceModalVisibleState, isSkillDetailModalVisibleState, skillsSelectedIdxState, skillForDetailsState, skillToChangeIdxState} from '../states/atoms'

const SkillIcon = ({activeClass, skill, context}) => {

  const setIsSkillChoiceModalVisible = useSetRecoilState(isSkillChoiceModalVisibleState)
  const setIsSkillDetailModalVisible = useSetRecoilState(isSkillDetailModalVisibleState)
  const setSkillForDetails = useSetRecoilState(skillForDetailsState)
  const setSkillToChangeIdx = useSetRecoilState(skillToChangeIdxState)
  // const [skillToChangeIdx, setSkillToChangeIdx] = useRecoilState(skillToChangeIdxState)
  const skillsSelectedIdx = useRecoilValue(skillsSelectedIdxState)

  const onClickSkill = () => {
    if (context === 'choiceModal') {
      setSkillForDetails(skill)
      setIsSkillDetailModalVisible(true)
    } else if (context.split('-')[0] === 'skill') {
      setSkillToChangeIdx(parseInt(context.split('-')[1]))
      setIsSkillChoiceModalVisible(true)
    } else if (context.split('-')[0] === 'toy') {
      setSkillForDetails(skill)
      setIsSkillDetailModalVisible(true)
    }
  }

  return (
    <>
    <div>
      <button className={styles['skill-icon-button']} onClick={onClickSkill} />
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

export default SkillIcon
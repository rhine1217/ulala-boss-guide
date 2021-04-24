import React from 'react'
import { classImgPrefix } from '../utils/charClassUtils'
import { useRecoilValue } from 'recoil'
import { classForSetupState } from '../states/atoms'
import styles from './SetupIcons.module.css'

const Skill = ({skill}) => {

  const classForSetup = useRecoilValue(classForSetupState)

  return (
    <div className={styles['skill-icon-wrapper']}>

      <div className={styles['skill-energy-wrapper']}>
        <img alt="" className={styles['skill-energy-img']} src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/cast+%23360820.png`} />
        <div className={styles['skill-energy-text']}>{skill.energy}</div>
      </div>

      <div className={styles['skill-img-wrapper']}>
        <img alt="" className={styles['skill-img-border']} src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/10.png`} />
        <img 
          className={styles['skill-img']}
          src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/${classImgPrefix[classForSetup]}_${skill['img_url']}.png`}
          alt="Character Skill" />
      </div>

      <div className={styles['skill-energy-type-text']}>{skill['energy_type']}</div>


    </div>
  )
}

const Toy = ({toy}) => {

  return (
    <div className={styles['toy-icon-wrapper']}>
      <img className={styles['toy-img']} src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/${toy['img_url']}.png`} alt="toy" />
    </div>
  )
}

const SetupIcons = {
  Skill,
  Toy
}

export default SetupIcons
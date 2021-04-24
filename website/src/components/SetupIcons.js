import React from 'react'
import { classImgPrefix } from '../utils/charClassUtils'
import { useRecoilValue } from 'recoil'
import { classForSetupState } from '../states/atoms'

const Skill = ({skill}) => {

  const classForSetup = useRecoilValue(classForSetupState)

  return (
    <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '55px', paddingTop: '5px'}}>

      <div style={{position: 'absolute', zIndex: '2', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
        <img alt="" style={{position: 'absolute', width: '25px',}} src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/cast+%23360820.png`} />
        <div style={{position: 'absolute', paddingBottom: '2px', color: 'white', fontWeight: 'bold', fontSize: '12px'}}>{skill.energy}</div>
      </div>

      <div style={{height: '50px', minWidth: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <img alt="" style={{position: 'absolute', zIndex: '1', width: '55px'}} src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/10.png`} />
        <img 
          style={{position: 'absolute', width: '50px'}} 
          src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/${classImgPrefix[classForSetup]}_${skill['img_url']}.png`}
          alt="Character Skill" />
      </div>

      <div style={{fontSize: '12px', paddingTop: '4px'}}>{skill['energy_type']}</div>
    </div>
  )
}

const Toy = ({toy}) => {

  return (
    <div style={{width: '60px', height: '60px', paddingLeft: '6px'}}>
      <img style={{maxHeight: '100%'}} src={`${process.env.REACT_APP_HOSTED_IMG_URL_PREFIX}/${toy['img_url']}.png`} alt="toy" />
    </div>
  )
}

const SetupIcons = {
  Skill,
  Toy
}

export default SetupIcons
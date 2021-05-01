import React from 'react'
import { Tag } from 'antd'
import { useRecoilValue } from 'recoil'
import { classTagsColor } from '../utils/charClassUtils'
import { classForSetupState } from '../states/atoms'
import ToyDesc from './ToyDesc'

const SetupDesc = ({value, context}) => {
  
  const classForSetup = useRecoilValue(classForSetupState)
  const description = value.description

  return (
    <div style={{paddingLeft: '16px', width: '100%'}}>
    <Tag color={classTagsColor[classForSetup]}>{value.name}</Tag>
      <div className={context === 'choiceModal' ? '' : "text-overflow"} style={{fontSize: '12px', paddingTop: '8px', minHeight: '4em'}}>
        {typeof description === 'string' ? description : 
        <ToyDesc description={description} />
        }
      </div>
  </div>
  )

}

export default SetupDesc
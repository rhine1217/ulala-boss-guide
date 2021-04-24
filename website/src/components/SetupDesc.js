import React from 'react'
import { Tag } from 'antd'
import { useRecoilValue } from 'recoil'
import { classTagsColor } from '../utils/charClassUtils'
import { classForSetupState } from '../states/atoms'

const SetupDesc = ({value}) => {
  
  const classForSetup = useRecoilValue(classForSetupState)

  return (
    <div style={{paddingLeft: '16px', width: '100%'}}>
    <Tag color={classTagsColor[classForSetup]}>{value.name}</Tag>
    {/* <Tooltip title={content} trigger="hover" placement="topLeft"> */}
      <div className="text-overflow" style={{fontSize: '12px', paddingTop: '8px', minHeight: '4em'}}>{value.description}</div>
    {/* </Tooltip> */}
  </div>
  )

}

export default SetupDesc
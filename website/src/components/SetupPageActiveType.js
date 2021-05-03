import React from 'react'
import { Radio } from 'antd'
import { useSetRecoilState } from 'recoil'
import { activeSetupTypeState } from '../states/atoms'

const SetupPageActiveType = () => {

  const setActiveSetupType = useSetRecoilState(activeSetupTypeState)
  const onChange = (e) => setActiveSetupType(e.target.value)

  return (
    <div style={{padding: '0 24px', textAlign: 'center'}}>
      <Radio.Group size="small" defaultValue="skill" buttonStyle="solid" onChange={onChange}>
        <Radio.Button style={{width: '100px'}} value="skill">Skill</Radio.Button>
        <Radio.Button style={{width: '100px'}} value="toy">Toy</Radio.Button>
      </Radio.Group>
    </div>
  )
  
}

export default SetupPageActiveType
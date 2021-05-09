import React from 'react'
import { Card } from 'antd'

const SetupDetailNote = (bossSetup) => (
  <Card>
    {bossSetup.note ? <div>{bossSetup.note}</div> :
    <i style={{color: 'grey'}}>This user is lazy and didn't leave anything behind.</i>}
  </Card>
)

export default SetupDetailNote
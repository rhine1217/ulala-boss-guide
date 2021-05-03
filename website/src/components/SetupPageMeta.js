import React from 'react'
import { Form } from 'antd'
import BossInput from './BossInput'
import ClassSelection from './ClassSelection'

const SetupPageMeta = ({context, bossName, onBossInput}) => (
  <Form layout="vertical" style={{padding: '16px 24px 0px'}}>
    <Form.Item required label="Boss">
      <BossInput context={context} bossName={bossName} onBossInput={onBossInput} />
    </Form.Item>
    <ClassSelection context={context} />
  </Form>
)

export default SetupPageMeta
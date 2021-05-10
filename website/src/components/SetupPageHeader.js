import React from 'react'
import { PageHeader, Button } from 'antd'

const SetupPageHeader = ({action, onSave, onPublish}) => (
  <PageHeader 
  title={`${action} a Setup`}
  onBack={() => window.history.back()}
  extra={[
    <Button key="save" onClick={onSave}>Save Draft</Button>,
    <Button key="publish" type="primary" onClick={onPublish}>Publish</Button>
  ]} />
)

export default SetupPageHeader
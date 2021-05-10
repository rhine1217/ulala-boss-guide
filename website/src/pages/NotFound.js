import React from 'react'
import { Result, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const NotFound = () => (
  <Result
    icon={<ExclamationCircleOutlined />}
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<a href="/"><Button type="primary">Back Home</Button></a>}
  />
)

export default NotFound
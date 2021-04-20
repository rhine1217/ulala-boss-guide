import React from 'react'
import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons'

const LoginButton = () => {

return (
  <Button 
    type="primary" 
    shape="round" 
    icon={<LoginOutlined />} 
    size="large">
      Join Now with Discord
  </Button>
)}



export default LoginButton
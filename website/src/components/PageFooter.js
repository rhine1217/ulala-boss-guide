import React from 'react'
import { Layout } from 'antd'
const { Footer } = Layout

const PageFooter = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <Footer 
      style={{backgroundColor: 'transparent', position: 'absolute', right: '0', bottom: '0', width: '100%'}}>
      <div style={{textAlign: 'center'}}>Made with &#10084;&nbsp; by Rhine</div>
    </Footer>
  </div>
))

export default PageFooter
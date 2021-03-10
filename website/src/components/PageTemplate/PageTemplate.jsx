import React from 'react'
import LeftNav from './LeftNav/LeftNav.jsx'
import TopNav from './TopNav/TopNav.jsx'
import { Layout } from 'antd'
  
import './GameConfigsPage.css'

const { Content, Footer } = Layout;

const PageShell = (props) => (
    <>
      <Layout>
          <LeftNav />
          <Layout className="site-layout" style={ {marginLeft: '200px'}}>
            <TopNav />

            <Footer style={{ textAlign: 'center' }}>Made by Rhine</Footer>
          </Layout>
      </Layout>
    </>

)

export default PageShell



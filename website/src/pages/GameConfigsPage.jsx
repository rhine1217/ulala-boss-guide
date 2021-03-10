import React from 'react'
import LeftNav from '../components/PageTemplate/LeftNav/LeftNav.jsx'
import TopNav from '../components/PageTemplate/TopNav/TopNav.jsx'
import ConfigSearch from '../components/GameConfigs/GameConfigsSearch/ConfigSearch.jsx'
import ConfigCard from '../components/GameConfigs/GameConfigsCard/ConfigCard.jsx'
import { Layout } from 'antd'
  
import './GameConfigsPage.css'

const { Content, Footer } = Layout;

const GameConfigsPage = (props) => (
    <>
      <Layout>
          <LeftNav />
          <Layout className="site-layout" style={ {marginLeft: '200px'}}>
            <TopNav />
            <Content className='content-card'>
              <ConfigSearch />
            </Content>
            <Content className='content-card'>
              <ConfigCard />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Made by Rhine</Footer>
          </Layout>
      </Layout>
    </>

)

export default GameConfigsPage



import React from 'react'
import { Row, Card, Col } from 'antd'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import SkillIcon from '../components/SkillIcon'
import ToyIcon from '../components/ToyIcon'
import SetupDesc from '../components/SetupDesc'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    partialVisibilityGutter: 0
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 60
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 60 
  }
}

const SetupDetailCarousel = ({activeSetup, context}) => (
  <Carousel responsive={responsive} arrows={false} partialVisible={true}>
    <div style={{marginRight: '16px'}}>
    <Card>
      <Row gutter={[16,16]}>
        {activeSetup['skills'].map((skill, idx) => (
        <Col span={24} key={idx}>
          <div style={{display: 'flex', alignItems: 'start'}}>
            <SkillIcon skill={skill} context={context} activeClass={activeSetup['player_class']} />
            <SetupDesc value={skill} context={'skill'} activeClass={activeSetup['player_class']} />
          </div>
        </Col>
        ))}
      </Row>
    </Card>        
    </div>
    <Card>
      <Row gutter={[16,16]}>
        {activeSetup['toys'].map((toy, idx) => (
          <Col span={24} key={idx}>
            <div style={{display: 'flex', alignItems: 'start'}}>
              <ToyIcon toy={toy} context={context} />
              <SetupDesc value={toy} context={'toy'} activeClass={activeSetup['player_class']} />
            </div>
          </Col>
        ))}
      </Row>
    </Card>    
  </Carousel>
)

export default SetupDetailCarousel
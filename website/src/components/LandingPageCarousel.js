import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Card, Col } from 'antd'
import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import SetupResultCardMeta from './SetupResultCardMeta'
import SetupResultCardIcons from './SetupResultCardIcons'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const LandingPageCard = ({result}) => {

  const [activeClassIdx, setActiveClassIdx] = useState(0)
  const [activeSetup, setActiveSetup] = useState(result['player_setup'][0])
  const history = useHistory()

  const changeActiveClass = (idx) => {
    setActiveClassIdx(idx)
    setActiveSetup(result['player_setup'][idx])
  }

  const goToSetupDetail = () => history.push(`/setup/${result.id}`)

  return (
    <Card hoverable
      onClick={goToSetupDetail}>
      <Row gutter={[16,16]}>
        <SetupResultCardMeta result={result} activeClassIdx={activeClassIdx} changeActiveClass={changeActiveClass} />
        <SetupResultCardIcons activeSetup={activeSetup} />
      </Row>
    </Card>
  )
}

const LandingPageCarousel = ({results}) => {
  return (
    <Carousel responsive={responsive} partialVisible={true} autoPlay={true} autoPlaySpeed={2000} infinite={true}>

  {results.map((result, idx) => (
    <div style={{margin: '16px 16px 16px 0px'}}>
    <LandingPageCard key={idx} result={result} />
    </div>
  ))}

  </Carousel>

  )
}

export default LandingPageCarousel
import React, { useState, useEffect } from 'react'
import LoginButton from '../components/LoginButton'
import LandingPageCarousel from '../components/LandingPageCarousel'
import { Button } from 'antd'
import Setup from '../Models/Setup'

const LandingPage = ({currentUser}) => {

  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState([])

  const getRandomSetups = async (size) => {
    try {
      const response = await Setup.Random(size)
      setResults(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRandomSetups(6)
  }, [])

  return (
    <>
  <div style={{padding: '2rem 10%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center'}}>
    <h1>Ulala Boss Guide</h1>
    <h2>
    Inspired by the UlalaBossBot (UlalaBot#9387). Create, share, and find setups for all the Ulala Bosses. Connect your Discord account now to save all your Boss setups in one place!
    </h2>
    <div style={{width: '100%', paddingTop: '1rem'}}>
    { currentUser ? 
      <a href='/all'>
        <Button type="primary" shape="round" size="large">See All Setups</Button>
      </a> : 
      <a href={`${process.env.REACT_APP_BACKEND_URL}/oauth2/login`}>
        <LoginButton />
      </a>
    }
    </div>
  </div>
  <div style={{width: '100%', padding: '0px 24px 24px'}}>
   { isLoading ? <></> : <LandingPageCarousel results={results} /> }
  </div> 
  </>
  )
}

export default LandingPage
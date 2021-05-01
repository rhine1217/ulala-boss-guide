import React from 'react'
import LoginButton from '../components/LoginButton'

const LandingPage = () => (
  <div style={{padding: '2rem 10%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center'}}>
    <h1>Ulala Boss Guide</h1>
    <h2>
    Inspired by the UlalaBossBot (UlalaBot#9387). Create, share, and find setups for all the Ulala Bosses. Connect your Discord account now to save all your Boss setups in one place!
    </h2>
    <div style={{width: '100%', paddingTop: '1rem'}}><a href={`${process.env.REACT_APP_BACKEND_URL}/oauth2/login`}><LoginButton /></a></div>
  </div>
)

export default LandingPage
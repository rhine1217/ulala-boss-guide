import './App.css';
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import AddSetup from './pages/AddSetup'
import Auth from './Models/Auth'
import { useRecoilState } from 'recoil'
import { userState } from './states/atoms' 

function App() {

  const [currentUser, setCurrentUser] = useRecoilState(userState)

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const user = await Auth.login()
        setCurrentUser(user.data)
      } catch (error) {
        console.log(error)
      }
    }
    authenticateUser()
  }, [])

  return (
    <div className="App">
      <Navbar currentUser={currentUser}/>
      <div className="container">
        <Switch>
          <Route exact path='/' render={() => <LandingPage />}/>
          <Route exact path='/add' render={() => <AddSetup />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;




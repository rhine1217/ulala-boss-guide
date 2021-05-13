import './App.css';
import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import PageFooter from './components/PageFooter'
import LandingPage from './pages/LandingPage'
import AddEditSetup from './pages/AddEditSetup'
import SetupResults from './pages/SetupResults'
import SetupDetails from './pages/SetupDetails'
import NotFound from './pages/NotFound'
import Auth from './Models/Auth'
import { useRecoilState } from 'recoil'
import { userState } from './states/atoms' 

function App() {

  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [isLoading, setIsLoading] = useState(true)
  let lastOnPage = localStorage.getItem('lastOnPage')

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const user = await Auth.login()
        setCurrentUser(user.data)
      } catch (error) {
        console.log(error)
      }
      if (currentUser) {
        localStorage.removeItem('lastOnPage')
      }
      setIsLoading(false)
    }
    authenticateUser()
  }, [])

  return (
    <div className="App">
      <Navbar currentUser={currentUser}/>
      <div className="container">
        {isLoading ? <></> :
        <Switch>
          <Route exact path='/' render={() => <LandingPage currentUser={currentUser} />} />
          <Route exact path='/login' component={() => {
            window.location.href = `${process.env.REACT_APP_BACKEND_URL}/oauth2/login`; 
            return null;}} />
          <Route exact path="/login/success" render={() => {
            if (lastOnPage) {
              localStorage.removeItem('lastOnPage');
              return (<Redirect to={lastOnPage} />)
            } else {
              return (<SetupResults context="favourites" />)
            }
          }} />
          <Route exact path='/setup/add'>
            {currentUser ? <AddEditSetup action='Add' /> : <Redirect to="/" />}
          </Route> 
          <Route exact path='/setup/edit/:id'>
            {currentUser ? <AddEditSetup action='Edit' /> : <Redirect to="/" />}
          </Route> 
          <Route exact path='/setup/:id' render={() => <SetupDetails />} />
          <Route path='/boss' render={() => <SetupResults context="searchName" />} />
          <Route path='/all' render={() => <SetupResults context="allSetups" />} />
          <Route path='/favourite'>
            {currentUser ? <SetupResults context="favourites" /> : <Redirect to="/login" />}
          </Route>
          <Route path="*"><NotFound /></Route>
        </Switch>
        }
        <PageFooter />
      </div>
    </div>
  );
}

export default App;
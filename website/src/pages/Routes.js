import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './LandingPage'
import AddEditSetup from './AddEditSetup'
import SetupResults from './SetupResults'
import SetupDetails from './SetupDetails'
import NotFound from './NotFound'


const Routes = ({currentUser}) => {
  let lastOnPage = localStorage.getItem('lastOnPage')
  return (
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
  )
}

export default Routes
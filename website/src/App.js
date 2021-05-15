import './App.css';
import React, { useEffect, useState } from 'react'
import Routes from './pages/Routes'
import Navbar from './components/Navbar'
import Auth from './Models/Auth'
import { useRecoilState } from 'recoil'
import { userState } from './states/atoms' 

function App() {

  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [isLoading, setIsLoading] = useState(true)

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
        {isLoading ? <></> : <Routes currentUser={currentUser} />}
      </div>
    </div>
  );
}

export default App;
import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_URL
})

class Auth {
  static login = () => {
    return instance.get('auth/user')
  }
}

export default Auth
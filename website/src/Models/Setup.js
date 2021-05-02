import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`
})

class Setup {
  static List = (name) => instance.get(`bosssetup/`, { 
    params: { name }
  })
  static Add = (data) => instance.post(`addsetup/`, data)
}

export default Setup
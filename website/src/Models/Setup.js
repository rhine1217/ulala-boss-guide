import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`
})

class Setup {
  static BossSetupList = (name) => instance.get(`bosssetup/`, { 
    params: { 
      name
    }})
}

export default Setup
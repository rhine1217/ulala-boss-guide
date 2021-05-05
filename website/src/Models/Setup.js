import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`, 
  xsrfHeaderName: "X-CSRFTOKEN",
  xsrfCookieName: "csrftoken"
})

class Setup {
  static List = (name) => instance.get(`bosssetup/`, { 
    params: { name }
  })
  static Add = (data) => instance.post(`addsetup/`, data)
  static Retrieve = (id) => instance.get(`bosssetup/${id}`)
  static Edit = (id, data) => instance.patch(`editsetup/${id}`, data)
  static Favourite = () => instance.get(`bosssetup/favourite/`)
}

export default Setup
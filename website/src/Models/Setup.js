import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_URL, 
  xsrfHeaderName: "X-CSRFTOKEN",
  xsrfCookieName: "csrftoken"
})

class Setup {
  static List = () => instance.get(`bosssetup/`)
  static ListByName = (name) => instance.get(`bosssetup/`, { 
    params: { name }
  })
  static Random = (size) => instance.get(`bosssetup/random/`, {
    params: { size }
  })
  static Add = (data) => instance.post(`addsetup/`, data)
  static Retrieve = (id, withComments) => instance.get(`bosssetup/${id}`, {
    params: { withComments }
  })
  static Edit = (id, data) => instance.patch(`editsetup/${id}`, data)
  static Destroy = (id) => instance.delete(`editsetup/${id}`)
  static Favourite = () => instance.get(`bosssetup/favourite/`)
}

export default Setup
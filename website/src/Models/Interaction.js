import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`, 
  xsrfHeaderName: "X-CSRFTOKEN",
  xsrfCookieName: "csrftoken"
})

const reqParams = (interactionType) => ({params: { interaction: interactionType}})

class Interaction {
  static Like = (data) => instance.post(`interaction/`, data, reqParams('like'))
  static Unlike = (setupId) => instance.delete(`interaction/${setupId}`, reqParams('like'))
  static Favourite = (data) => instance.post(`interaction/`, data, reqParams('favourite'))
  static Unfavourite = (setupId) => instance.delete(`interaction/${setupId}`, reqParams('favourite'))
}

export default Interaction